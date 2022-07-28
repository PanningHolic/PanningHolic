let currentAccount = null;


//檢測是否有下載錢包
function Detect_Metamask_Download(){
  myGameInstance.SendMessage("WebManager","ScenesChange","in_progress");   //同步
  const provider = async () => {
    await detectEthereumProvider()
  }

  if(provider){
    ConnectMetaMask()
  }
  else{
    alert("Please install the metamask!");
  }
}

//檢測是否連接錢包
function ConnectMetaMask(){
  if (window.ethereum) {
    ethereum.request({ method: 'eth_requestAccounts' }).then(handleAccountsChanged)
    .catch((err) => {
      if (err.code === 4001) {
        console.log("Please connect to MetaMask. (clear cache and refresh)");
      } else {
        console.error(err);
      }
    });
  
  }
  else{
    alert("multiple wallets installed");
  }
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



//檢查鏈的改變
function ChainChange(){
  const chainId = async () => {
    await ethereum.request({ method: 'eth_chainId' });
  }
  handleChainChanged(chainId);

  ethereum.on('chainChanged', handleChainChanged);

}
function handleChainChanged(_chainId) {
  window.location.reload();
}


//檢查帳戶的改變
function AccountChange(){
  ethereum.request({ method: 'eth_accounts' }).then(handleAccountsChanged)
    .catch((err) => {
      console.error(err);
    });

  ethereum.on('accountsChanged', handleAccountsChanged);
}

//處理帳號改變
function handleAccountsChanged(accounts) {
  if (accounts.length === 0) {
    console.log('Please connect to MetaMask.');
  } else if (accounts[0] !== currentAccount) {
    currentAccount = accounts[0];
    console.log("connection succeeded");
    myGameInstance.SendMessage("WebManager","ScenesChange","succeeded");
  }
}

