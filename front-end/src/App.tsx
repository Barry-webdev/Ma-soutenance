import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Accueil from './Component/Admin/Accueil'
import CreateCompte from './Component/CreateCompte'
import Login from './Component/Login'
// import AccueilUt from './Component/Utilisateur/AccueilUt'
import Recycle from './Component/Utilisateur/Recycle'


function App() {

  return (
    <Router>
        <div>
          
        <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/accueil' element={<Accueil/>}/>
            <Route path='/recycle' element={<Recycle/>}/>
            <Route path='/createcompte' element={<CreateCompte/>}/>
            <Route path="*" element={<div>Page Not Found</div>} /> {/* Route pour les pages non trouvées */}
        </Routes>
        </div>
    </Router>
    
  )
}

export default App
