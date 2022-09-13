const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'X-API-Key': 'E7Z0sMo5NjQJvD9ZmOJmnkeKBKJKByLoL7rppuxErl6PfLcfc7SUkszzlMlstq1D'
    }
  };
const tokenAddress = "0x40e5e7e7066bC67518ebD81e5c05D826B4bC2e4a";
var number = [];

function getNFTOwner(address) {
    fetch('https://deep-index.moralis.io/api/v2/' + address + '/nft/' + tokenAddress + '?chain=rinkeby&format=decimal', options)
    .then(response => response.json())
    .then((response) => {
            if(response.result.length != 0){ 
                for(let i = 0; i < response.result.length; i++){
                    number[i] = response.result[i].token_id;
                    for(let j = 0; j < i; j++){
                        if(number[j] > number[i]){
                            let temp = number[j];
                            number[j] = number[i];
                            number[i] = temp;
                        }
                    }
                }
                console.log(number);
                //return number;
            } else {
                console.log('false');
                //return false;
            }
        }
    )
    .catch(err => console.error(err));
}

function checkNFT(tokenId) {
    for(let i = 0; i < number.length; i++){
        if(number[i] == tokenId){
            //return true;
            if(parseInt(tokenId,10)>4){
                myGameInstance.SendMessage("ChooseCanvas/Right","CancelMask","true");
            }
            else{
                myGameInstance.SendMessage("ChooseCanvas/SkillOne","DetectSkillNFT","true"+tokenId);
            }
            break;
        }
    }
}
