const contractAddress = "0xaE281bf3cA8EBaAbe209b8Bb1d10963a82B061EA";
const metamaskChainID = '18';
const metamaskHexChainID = '0x12';

let EntranceBtn = document.getElementById("setEntrance");

if(typeof web3 !== 'undefined') {
    web3 = new Web3(window.ethereum);
 } else {
    alert('Please install MetaMask!');
 }

async function connectMetamask() {
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
    if(chainId !== metamaskHexChainID){
        changeChainId();
    }
 }

function changeChainId() {
    ethereum.request({
        method: 'wallet_switchEthereumChain',
        params:[{chainId: metamaskHexChainID}]
    }).then(() => {
        connectWallet()
    }).catch(() => {
        ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
                chainId: metamaskHexChainID,
                chainName: "ThunderCore Testnet",
                rpcUrls: ["https://testnet-rpc.thundercore.com"],
                nativeCurrency: {
                    name: "TST Token",
                    symbol: "TST",
                    decimals: 18,
                },
                blockExplorerUrls: ["https://explorer-testnet.thundercore.com/"]
            }]
        })
    })
}

async function connectWallet() {
    coinbase = await web3.eth.getCoinbase();
    $("#address").text(coinbase.substring(0,14) + "...");
    balance = await web3.eth.getBalance(coinbase);
    $("#balance").text(parseFloat(web3.utils.fromWei(balance)).toFixed(3) + 'ETH');
    CashFlow = new web3.eth.Contract(CashFlowABI, contractAddress)
}

async function entranceFee() {
    let chainId = await ethereum.request({method: 'eth_chainId'});
    if(chainId === metamaskHexChainID) {
        if(location.href.includes('ref')) {
            const address = location.href.split('ref=')[1]
            const price = await CashFlow.methods.getEntrance().call();
            CashFlow.methods.entranceFee(address).send({
                from: coinbase,
                value: price
            }).then((result) => {
                connectWallet();
                console.log(result.status);
                return result.status;
            }).catch(() =>{
                console.log("false");
                return false;
            })
        } else {
            const price = await CashFlow.methods.getEntrance().call();
            CashFlow.methods.entranceFee().send({
                from: coinbase,
                value: price
            }).then((result) => {
                connectWallet();
                console.log("status: " + result.status);
                return result.status;
            }).catch(() =>{
                console.log("status: " + false);
                return false;
            })
        }
    } else {
        changeChainId();
    }
}

async function PayForWins() {
    let chainId = await ethereum.request({method: 'eth_chainId'});
    if(chainId === metamaskHexChainID) {
        CashFlow.methods.payForWins().send({
            from: coinbase
        }).then((result) => {
            connectWallet();
            console.log("status: " + result.status);
            return result.status;
        }).catch(() =>{
            console.log(false);
            return false;
        })
    } else {
        changeChainId();
    }
}

async function ExitGame() {
    let chainId = await ethereum.request({method: 'eth_chainId'});
    if(chainId === metamaskHexChainID) {
        CashFlow.methods.exitGame().send({
            from: coinbase
        }).then((result) => {
            connectWallet();
            console.log("status: " + result.status);
            return result.status;
        }).catch(() =>{
            console.log(false);
            return false;
        })
    } else {
        changeChainId();
    }
}

ethereum.on("accountsChanged",async (account) => {
    console.log(account);
    let chainId = await ethereum.request({method: 'eth_chainId'});
    if(chainId == metamaskHexChainID) {
        connectWallet();
    }
})
