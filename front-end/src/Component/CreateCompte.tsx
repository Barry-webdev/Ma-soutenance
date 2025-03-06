import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CreateCompte() {
    const navigate = useNavigate();
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [telephone, setTelephone] = useState('');
    const [email, setEmail] = useState('');
    const [mdp, setMdp] = useState('');
    const [confirmMdp, setConfirmMdp] = useState(''); // Corrigé: cmdp -> confirmMdp
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (mdp !== confirmMdp) {
            setMessageType('error');
            setMessage('Les mots de passe ne correspondent pas');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/createcompte', {
                nom,
                prenom,
                telephone,
                email,
                mdp,
                confirm_mdp: confirmMdp, // Correspondance avec le backend
            });

            if (response.status === 201) {
                setMessageType('success');
                setMessage('Utilisateur enregistré avec succès');
                setTimeout(() => navigate('/login'), 2000);
            } else {
                setMessageType('error');
                setMessage("Erreur d'enregistrement, veuillez réessayer");
            }
        } catch (error) {
            setMessageType('error');
            setMessage("Échec d'enregistrement, veuillez réessayer");
        }
    };

    return (
        <div className="flex items-center justify-center bg-gray-100 min-h-screen">
            <div className="bg-white p-6 rounded-lg shadow-lg border-gray-300 w-96">
                <div className="flex justify-center mb-4">
                    <img src="src/assets/Logo.png" alt="Logo" className="w-20 h-20" />
                </div>

                {message && (
                    <div className={`text-center mb-4 ${messageType === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                        {message}
                    </div>
                )}

                <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">Inscription</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block float-left text-gray-600 text-sm mb-1 font-bold">Nom</label>
                        <input
                            type="text"
                            onChange={(e) => setNom(e.target.value)}
                            value={nom}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Entrez votre nom"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block float-left text-gray-600 text-sm mb-1 font-bold">Prénom</label>
                        <input
                            type="text"
                            onChange={(e) => setPrenom(e.target.value)}
                            value={prenom}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Entrez votre prénom"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block float-left text-gray-600 text-sm mb-1 font-bold">Numéro de Téléphone</label>
                        <input
                            type="text"
                            onChange={(e) => setTelephone(e.target.value)}
                            value={telephone}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Entrez votre numéro"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block float-left text-gray-600 text-sm mb-1 font-bold">Adresse Email</label>
                        <input
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Entrez votre email"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block float-left text-gray-600 text-sm mb-1 font-bold">Mot de passe</label>
                        <input
                            type="password"
                            onChange={(e) => setMdp(e.target.value)}
                            value={mdp}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Créer un mot de passe"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block float-left text-gray-600 text-sm mb-1 font-bold">Confirmation de mot de passe</label>
                        <input
                            type="password"
                            onChange={(e) => setConfirmMdp(e.target.value)} // Corrigé: setCmdp -> setConfirmMdp
                            value={confirmMdp} // Corrigé: cmdp -> confirmMdp
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Confirmez votre mot de passe"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                    >
                        Créer un compte
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CreateCompte;
