
import './App.css';
import LandingPage from './Components/LandingPage/LandingPage';
import RegisterUser from './Components/RegisterUser/RegisterUser';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import MainContainer from './MainContainer';
import UserDashboard from './Components/UserDasboard/UserDashboard';
import ImportedNFTs from './Components/UserDasboard/NFTsComp/ImportedNFTs';
import StakedNFTs from './Components/UserDasboard/NFTsComp/StakedNFTs';
import StakNftDetails from './Components/UserDasboard/NFTsDetails/StakNftDetails';
import ImpNftDetails from './Components/UserDasboard/NFTsDetails/ImpNftDetails';


function App() {
 
  const browserRouter=createBrowserRouter([
    {
      path:'/',
      element:<MainContainer/>,
     children:[
      {
        path:'/',
        element:<LandingPage/>
      },
      {
        path:'registerUser',
        element:<RegisterUser/>
      },
      {
        path:'/userDashboard',
        element:<UserDashboard/>,
   
      },
      {
        path:'/ImpNftDetails',
        element:<ImpNftDetails/>,
   
      },
      {
        path:'/StakNftDetails',
        element:<StakNftDetails/>,
   
      }

     ]
    },
 
  
  ])

  

  return (
    <div className="app">
    <RouterProvider router={browserRouter}>

    </RouterProvider>
    </div>
  );
}

export default App;
