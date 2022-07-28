const contractAddress = "0x518316a8f33717636C14887fa4aF0C50B3FA04d8";
const metamaskChainID = '18';
const metamaskHexChainID = '0x12';

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
    myContract = new web3.eth.Contract(CashFlowABI, contractAddress);
    myGameInstance.SendMessage("WebManager","ScenesChange","succeeded");  //登入成功，切換畫面
}
async function connectWallet_E() {
    coinbase = await web3.eth.getCoinbase();
    $("#address").text(coinbase.substring(0,14) + "...");
    balance = await web3.eth.getBalance(coinbase);
    $("#balance").text(parseFloat(web3.utils.fromWei(balance)).toFixed(3) + 'ETH');
    myContract = new web3.eth.Contract(CashFlowABI, contractAddress);
}

async function entranceFee() {
    let chainId = await ethereum.request({method: 'eth_chainId'});
    if(chainId === metamaskHexChainID) {
        if(location.href.includes('ref')) {
            const address = location.href.split('ref=')[1]
            const price = await myContract.methods.getEntrance().call();
            myContract.methods.entranceFee(address).send({
                from: coinbase,
                value: price
            }).then(function(result) {
                connectWallet_E(); 
                console.log(result.status);
                myGameInstance.SendMessage("NetworkManager","PaidStatus","true"); //成功地方要用myGameInstance.SendMessage回傳paid true ;失敗地方回傳LoadingPay false. 都要alert
                alert("Successful payment,please click the button again.");
                return result.status;
            }).catch(() =>{
                console.log("false");
                myGameInstance.SendMessage("NetworkManager","LoadingPay","false");
                alert("Payment Fail");
                return false;
            })
        } else {
            const price = await myContract.methods.getEntrance().call();
            myContract.methods.entranceFee().send({
                from: coinbase,
                value: price
            }).then(function(result) {
                connectWallet_E();
                console.log("status: " + result.status);
                myGameInstance.SendMessage("NetworkManager","PaidStatus","true"); //成功地方要用myGameInstance.SendMessage回傳paid true ;失敗地方回傳LoadingPay false. 都要alert
                alert("Successful payment,please click the button again.");
                return result.status;
            }).catch(() =>{
                console.log(false);
                myGameInstance.SendMessage("NetworkManager","LoadingPay","false");
                alert("Payment Fail");
                return false;
            })
        }
    } else {
        changeChainId();
        myGameInstance.SendMessage("NetworkManager","LoadingPay","false");
        alert("Payment Fail");
    }
}

async function PayForWins() {
    let chainId = await ethereum.request({method: 'eth_chainId'});
    if(chainId === metamaskHexChainID) {
        myContract.methods.payForWins().send({
            from: coinbase
        }).then(function(result) {
            connectWallet_E();
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
        myContract.methods.exitGame().send({
            from: coinbase
        }).then(function(result) {
            connectWallet_E();
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

function alertPlayer(){
    alert("Payment not yet successful.");
}

function changeState() {
    myContract.methods.changeState().send({
        from: coinbase
    }).then(console.log);
}

async function getContractBalance() {
    const balance = await myContract.methods.getBalance().call() * 0.000000000000000001;
    document.getElementById('vision').innerHTML = balance + 'TST';
}

async function getState() {
    const state = await myContract.methods.getState().call();
    document.getElementById('vision').innerHTML = state;
}

function SetEntrance(value) {
    let price = document.getElementById("entrance").value;
    myContract.methods.setEntrance(price).send({from: coinbase});
}
EntranceBtn.addEventListener("click", SetEntrance);

function clearMarket() {
    myContract.methods.clearMarket(coinbase).send({
        from: coinbase
    })
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

ethereum.on("accountsChanged",async (account) => {
    let chainId = await ethereum.request({method: 'eth_chainId'});
    if(chainId == metamaskHexChainID) {
        connectWallet();
    }
})
