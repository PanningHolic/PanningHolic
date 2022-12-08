const contractAddress = "0x6AAeef269aA99e79A199b95a881066902bfC46D3";
const metamaskChainID = '108';
const metamaskHexChainID = '0x6c';

let EntranceBtn = document.getElementById("setEntrance");

if(typeof web3 !== 'undefined') {
    web3 = new Web3(window.ethereum);
 } else {
    alert('Please install MetaMask!');
 }

async function connectMetamask() {
    myGameInstance.SendMessage("WebManager","ScenesChange","in_progress");   //同步
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
                chainName: "ThunderCore Mainnet",
                rpcUrls: ["https://mainnet-rpc.thundercore.com"],
                nativeCurrency: {
                    name: "TT Token",
                    symbol: "TT",
                    decimals: 18,
                },
                blockExplorerUrls: ["https://viewblock.io/thundercore"]
            }]
        })
    })
}

async function connectWallet() {
    coinbase = await web3.eth.getCoinbase();
    $("#address").text(coinbase.substring(0,14) + "...");
    balance = await web3.eth.getBalance(coinbase);
    $("#balance").text(parseFloat(web3.utils.fromWei(balance)).toFixed(3) + 'ETH');
    CashFlow = new web3.eth.Contract(CashFlowABI, contractAddress);
    myGameInstance.SendMessage("WebManager","ScenesChange","succeeded");  //登入成功，切換畫面
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
                myGameInstance.SendMessage("NetworkManager","PaidStatus","true");
                alert("Successful payment,please click the button again.");
                console.log(result.status);
                return result.status;
            }).catch(() =>{
                myGameInstance.SendMessage("NetworkManager","LoadingPay","false");
                alert("Payment Fail");
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
                myGameInstance.SendMessage("NetworkManager","PaidStatus","true"); //成功地方要用myGameInstance.SendMessage回傳paid true ;失敗地方回傳LoadingPay false. 都要alert
                alert("Successful payment,please click the button again.");
                console.log("status: " + result.status);
                return result.status;
            }).catch(() =>{
                myGameInstance.SendMessage("NetworkManager","LoadingPay","false");
                alert("Payment Fail");
                console.log("status: " + false);
                return false;
            })
        }
    } else {
        changeChainId();
        myGameInstance.SendMessage("NetworkManager","LoadingPay","false");
        alert("Payment Fail");
    }
}

function alertPlayer(){
    alert("Payment not yet successful.");
}

function Show_the_Address(){
    ethereum.request({ method: 'eth_accounts' }).then((accounts) => {
        console.log("Address："+accounts[0]);   //accounts為一陣列
        myGameInstance.SendMessage("Address","Show_Address",accounts[0]);
    })
    .catch((error) => {
        console.error(error);
    });
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
