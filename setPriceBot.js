const Telegraf = require('telegraf')
const Web3 = require('web3');
const provider = new HDWalletProvider(
	'recycle dash year slim prison twenty angle parade mouse rack adult method',
	'https://rinkeby.infura.io/w7sXwXV3GmYH938ht480'
);
const web3 = new Web3(provider);
const bot = new Telegraf("469595313:AAFa2zMPw7RtZVcpHKbix24wGJ1EdaG4QyY")


bot.hears('Подтверждаю', (ctx) => updatePrice(ctx.message));
bot.hears('Отмена', (ctx) => ctx.reply('Запись цены была отменена'))
bot.startPolling()
bot.catch((err) => {
  console.log('Ooops', err)
})

async function updatePrice(price) {
  const contractAbi = require('./compile');
  const contractAddress = "0x41f5a766f89ddb631c598a67892547d7db56a3dd";
  const accounts = await web3.eth.getAccounts();
  const contract = web3.eth.contract(contractAbi);
  const contractInstance = await contract.at(contractAddress);
  const transactionObject = {
    from: accounts[0],
    gas: '100000'
    gasPrice: '7'
  };

  await contractInstance.setTokenPrice.sendTransaction(price, transactionObject, (error, result) => {console.log('The Price is Setted', result.options.tokenPrice)});
};
