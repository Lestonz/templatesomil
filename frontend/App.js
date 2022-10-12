import { HARDHAT_PORT, HARDHAT_PRIVATE_KEY } from '@env';
import { useWalletConnect } from '@walletconnect/react-native-dapp';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import localhost from 'react-native-localhost';
import Web3 from 'web3';
import { ethers } from 'ethers';
import MyToken from '../artifacts/contracts/MyToken.sol/MyToken.json';
import { Input } from "react-native-elements";

const styles = StyleSheet.create({
  center: { alignItems: 'center', justifyContent: 'center' },
  // eslint-disable-next-line react-native/no-color-literals
  white: { backgroundColor: 'white' },
});

const contractAddress = "0xFc08b117d41C31d5adE438d3c33cBC560EA94371"

export default function App() {
  const connector = useWalletConnect();

  const [message, setMessage] = React.useState('Loading...');
  const [selfPrice, setSelfPrice] = React.useState("");

  const [address, setAddress] = React.useState("");
  
  const [total, setTotal] = React.useState("")

  const provider = "https://goerli.infura.io/v3/39629140217f477c8446d8bc6a9b8dc0";

  const web3 = React.useMemo(
    () => new Web3(new Web3.providers.HttpProvider(provider)), []
  );

  React.useEffect(()=> {
    // Total()
  }, [])

  const Total = async () => {
    const myContract = new web3.eth.Contract(MyToken.abi, contractAddress )
    const senderAddress = `${connector.accounts}`
    console.log(senderAddress, "senderAddress")


    const deneme =  myContract.methods.totalSupply().call().toString()
    console.log("denemefff" )
    console.log("deneme",deneme )
    setTotal(deneme)
  }

  const mint = React.useCallback(async () => {
   
      try {
        const myContract = new web3.eth.Contract(MyToken.abi, contractAddress )

        const contractData =  myContract.methods.mint("0x8B6FE676217eEE2C9Cf484203Cb8855ca85eB07D", 10).encodeABI().toString()

        const value = ethers.utils.parseEther(0.0.toString())._hex

        console.log(value)
        const senderAddress = `${connector.accounts}`
        console.log(senderAddress, "senderAddress")


        const tx = {
          from: `${connector.accounts}`, // Required
          to: contractAddress, // Required (for non contract deployments)
          data: `${contractData}`, // Required
          // gasPrice: "0x02540be400", // Optional
          // gasLimit: "0x9c40", // Optional
          value: `${value}`, // Optional
          // nonce: "0x0114" // Optional
        };

        await connector.sendTransaction(tx)


      } catch (error) {
        console.error(error);
      }
  },[])


  const sendETH = React.useCallback(async () => {

    try {
      const value = ethers.utils.parseEther(selfPrice.toString())._hex
      const receiver = address.toString()

      const txSecond = {
        from: `${connector.accounts}`, // Required
        to: receiver, // Required (for non contract deployments)
        data: "0x0001", // Required
        // gasPrice: "0x02540be400", // Optional
        // gasLimit: "0x9c40", // Optional
        value: `${value}`, // Optional
        // nonce: "0x0114" // Optional
      }

      await connector.sendTransaction(txSecond)

    } catch (error) {
      console.error(error);
    }
  })



  const connectWallet = React.useCallback(() => {
    return connector.connect();
  }, [connector]);




  const killSession = React.useCallback(() => {
    return connector.killSession();
  }, [connector]);


  return (
    <View style={[StyleSheet.absoluteFill, styles.center, styles.white]}>
      <Text testID="tid-message">{message}</Text>
      {!connector.connected && (
        <TouchableOpacity onPress={connectWallet} style={{height:50, width:100, backgroundColor:"#068CE8", justifyContent:"center",  alignItems:'center', margin:20  }}>
          <Text>Connect a Wallet</Text>
        </TouchableOpacity>
      )}
      {!!connector.connected && (
        <>
          <Text style={{color:"#000" }} >VALUE OF ETHER</Text>                   
            <Input
              placeholder="Enter Ether Amount..."
              style={{  marginLeft:10}}
              inputContainerStyle={{
                borderWidth: 1,
                borderRadius: 10,
                width:"100%",
                height:50,
                marginTop:30
              }}
              keyboardType="numeric"
         
            onChangeText={(selfPrice) => {
              setSelfPrice(selfPrice.replace(",", "."));
            }}
             
            />
             <Text style={{color:"#000" }} >Recipient Address</Text>                   
            <Input
              placeholder="Enter Address"
              style={{  marginLeft:10}}
              inputContainerStyle={{
                borderWidth: 1,
                borderRadius: 10,
                width:"100%",
                height:50,
                marginTop:30
              }}
             
         
            onChangeText={(text) => {
              setAddress(text);
            }}
             
            />
          <TouchableOpacity style={{height:50, width:100, backgroundColor:"#068CE8", justifyContent:"center",  alignItems:'center', margin:20  }} onPress={() => sendETH()}>
            <Text>Send ETH</Text>
          </TouchableOpacity>

          <Text>{connector.accounts}</Text>
          <TouchableOpacity style={{height:50, width:100, backgroundColor:"#089675", justifyContent:"center",  alignItems:'center', margin:20  }} onPress={() => mint()}>
            <Text>Mint A Token</Text>
          </TouchableOpacity>

          <Text>{total}</Text>
          <TouchableOpacity style={{height:50, width:100, backgroundColor:"#E82D06", justifyContent:"center",  alignItems:'center', margin:20  }} onPress={killSession}>
            <Text>Kill Session</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}