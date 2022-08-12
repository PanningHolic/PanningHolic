const NFTcontractAddress = "0x40e5e7e7066bC67518ebD81e5c05D826B4bC2e4a";
const metamaskNFTChainID = '4';
const metamaskNFTHexChainID = '0x4';
const seed = '1004847';
const salt = '7982843';
const sugar = '6648692';

if(typeof web3 !== 'undefined') {
    web3 = new Web3(window.ethereum);
    myContract = new web3.eth.Contract(NFTABI, NFTcontractAddress);
    connectWallet();
} else {
    alert('Please install MetaMask!');
}

async function connectMetaMask() {
    ethereum.request({ method: 'eth_requestAccounts' }).then(() =>{
        connectWallet();
    }).catch(() => {
        if (err.code === 4001) {
            alert('Please connect to MetaMask.');
        } else {
            console.error(err);
        }
    })
    let chainId = await ethereum.request({method: 'eth_chainId'});
    if(chainId !== metamaskNFTHexChainID){
        changeChainId();
    }
 }

function changeChainId() {
    ethereum.request({
        method: 'wallet_switchEthereumChain',
        params:[{chainId: metamaskNFTHexChainID}]
    }).then(() => {
        connectWallet()
    }).catch(() => {
        ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
                chainId: metamaskNFTHexChainID,
                chainName: "rinkey",
                rpcUrls: ["https://rinkeby.infura.io/v3/"],
                nativeCurrency: {
                    name: "ETH",
                    symbol: "ETH",
                    decimals: 18,
                },
                blockExplorerUrls: ["https://rinkeby.etherscan.io"]
            }]
        })
    })
}

async function connectWallet() {
    coinbase = await web3.eth.getCoinbase();
    $("#address").text(coinbase.substring(0,14) + "...");
    balance = await web3.eth.getBalance(coinbase);
    $("#balance").text(parseFloat(web3.utils.fromWei(balance)).toFixed(3) + 'ETH');
}

async function mintNFT() {
    const chainId = await web3.eth.getChainId();
    if(chainId == metamaskNFTChainID) {
        const price = await myContract.methods.getPrice().call();
        $(".confirm").fadeIn(250);
        connectMetaMask();
        myContract.methods.MintTheNFT(seed, salt, sugar).send({
            from: coinbase,
            value: price
        }).then((result) => {
            connectWallet();
            number = result.events.TransferSingle.returnValues.id;
            $(".confirm").fadeOut(200);
            $(".popup-wrap").fadeIn(250);
            $(".openBtn").fadeIn(250);
            $(".popup-box").removeClass("transform-out").addClass("transform-in");
            $(".popup-close").click(function() {
                closeWindow();
              });
        }).catch(() =>{
            $(".confirm").fadeOut(250);
        });
    } else {
        connectMetaMask();
    }
}

function closeWindow() {
    $(".popup-wrap").fadeOut(200);
    $(".gif").fadeOut(200);
    $(".NFTname").fadeOut(200);
    $(".popup-box").removeClass("transform-in").addClass("transform-out");
}

function openBlackBox() {
    document.getElementById('move_picture').src = "";
    $(".openBtn").fadeOut(1000, gifAndName);
}

function gifAndName(){
    if(number == 0) {
        document.getElementById('name').innerHTML = "疾行";
        document.getElementById('move_picture').src = "https://thumbs.gfycat.com/AstonishingWellwornLark.webp";
    } else if(number == 1) {
        document.getElementById('name').innerHTML = "破壞";
        document.getElementById('move_picture').src = "https://thumbs.gfycat.com/EllipticalEllipticalAmericanlobster.webp";
    } else if(number == 2) {
        document.getElementById('name').innerHTML = "狙殺";
        document.getElementById('move_picture').src = "https://thumbs.gfycat.com/MinorFatherlyCleanerwrasse.webp";
    } else if(number == 3) {
        document.getElementById('name').innerHTML = "守護";
        document.getElementById('move_picture').src = "https://thumbs.gfycat.com/SpicyOrdinaryAlpineroadguidetigerbeetle.webp";
    } else if(number == 4) {
        document.getElementById('name').innerHTML = "偵查";
        document.getElementById('move_picture').src = "https://thumbs.gfycat.com/ScarySmugDrongo.webp";
    } else if(number == 5) {
        document.getElementById('name').innerHTML = "潛行者";
        document.getElementById('move_picture').src = "https://thumbs.gfycat.com/SparseHilariousAsianwaterbuffalo.webp";
    } else if(number == 6) {
        document.getElementById('name').innerHTML = "束縛者";
        document.getElementById('move_picture').src = "https://thumbs.gfycat.com/SmoothWelloffKawala.webp";
    } else if(number == 7) {
        document.getElementById('name').innerHTML = "破空者";
        document.getElementById('move_picture').src = "https://thumbs.gfycat.com/ThisShowyGuppy.webp";
    } else if(number == 8) {
        document.getElementById('name').innerHTML = "神秘碎片1";
        document.getElementById('move_picture').src = "https://thumbs.gfycat.com/FoolishEnchantedBison-size_restricted.gif";
    } else if(number == 9) {
        document.getElementById('name').innerHTML = "神秘碎片2";
        document.getElementById('move_picture').src = "https://thumbs.gfycat.com/CarefulSpitefulFrogmouth-size_restricted.gif";
    } else if(number == 10) {
        document.getElementById('name').innerHTML = "神秘碎片3";
        document.getElementById('move_picture').src = "https://thumbs.gfycat.com/SpicyVacantArmednylonshrimp-size_restricted.gif";
    } else if(number == 11) {
        document.getElementById('name').innerHTML = "神秘碎片4";
        document.getElementById('move_picture').src = "https://thumbs.gfycat.com/IndolentDismalApe-size_restricted.gif";
    } else if(number == 12) {
        document.getElementById('name').innerHTML = "神秘碎片5";
        document.getElementById('move_picture').src = "https://thumbs.gfycat.com/CircularVainArgentinehornedfrog-size_restricted.gif";
    } else if(number == 13) {
        document.getElementById('name').innerHTML = "神秘碎片6";
        document.getElementById('move_picture').src = "https://thumbs.gfycat.com/FrequentFavoriteAustralianfurseal-size_restricted.gif";
    } else if(number == 14) {
        document.getElementById('name').innerHTML = "金牌！！！";
        document.getElementById('move_picture').src = "https://thumbs.gfycat.com/VengefulFlusteredIcefish-size_restricted.gif";
    } else if(number == 15) {
        document.getElementById('name').innerHTML = "護盾！！！";
        document.getElementById('move_picture').src = "https://thumbs.gfycat.com/CircularSmugIzuthrush-size_restricted.gif";
    }
    $(".gif").fadeIn(1000);
    $(".NFTname").fadeIn(1000);
}

ethereum.on("accountsChanged", (accounts) => {
    web3.eth.getChainId().then(function (chainId) {
        if(chainId == metamaskNFTChainID) {
            connectWallet();
        }
    })
})
