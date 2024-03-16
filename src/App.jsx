import Home from './components/Home.jsx'
import Footer from './components/common/Footer.jsx'
import NavBar from './components/common/NavBar.jsx'
import TintShadyContextProvider from './store/tint-shady-context-provider.jsx'

function App() {
  return ( 
  <>
  <NavBar/>
  <TintShadyContextProvider>
    <Home />
  </TintShadyContextProvider>
  <Footer/>
  </>
  
  )
}

export default App
