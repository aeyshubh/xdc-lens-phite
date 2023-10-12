import type { NextPage } from 'next';
import Link from 'next/link';
import { usePrepareContractWrite, useContractWrite,  useWaitForTransaction } from 'wagmi'
import {abi4} from '../utils/nft'
import { ethers } from 'ethers';
const Home: NextPage = () => {
function mintNft(){
  try{
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  provider.send('eth_requestAccounts', []);
  const signer = provider.getSigner();
  const nftContract = "0x72C86E4C9f5da968093f3bB23D9fD8d028B6B965";
  //const nftContract = "0x9926566A54B0fBA12F1773877492d350c5d2ad26";

  const contractWrite2 = new ethers.Contract(nftContract, abi4, signer);
const status = contractWrite2.mintMyNft({ gasLimit: 5000000 });
  }catch(e){
    console.log(e)
  }
if(status){
 // alert("Successfully minted");
}
}

  return (
    <>
      <section className="bg-gray-900">
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
            <div className="mr-auto place-self-center lg:col-span-7">
                <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-white ">Battle for the <span className='font-vt text-[#f1c40f] text-7xl'>Lens Stats</span></h1>
                <p className="max-w-2xl mb-6 font-normal text-gray-400 lg:mb-8 md:text-lg lg:text-xl">Take a look at who your competitor is, the more stats you have on lens, the more chance for you win in every game.</p>
                <button onClick={() => mintNft?.()} className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
                    Mint NFT
                    {/* <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg> */}
                </button>

                <button className='index-battle-btn font-jose'>
                <Link href={'/play'}>
                    Go for Battle 
                </Link>
                </button> 
            </div>
            <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
                <img src="/images/lens_logo_edited.png" alt="hero image" width={500} height={300}/>
            </div>                
        </div>
      </section>
    </>

  );
};

export default Home;