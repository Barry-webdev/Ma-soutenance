const Connect = () => {
    return (
        <div className="flex items-center justify-center bg-gray-100 ">
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-300 w-96">
                {/* Logo centré */}
                <div className="flex justify-center mb-4">
                    <img src="src/assets/Logo.png" alt="Logo" className="w-20 h-20" />
                </div>

                <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">Connexion</h2>
                <form>
                    <div className="mb-4">
                        <label className="block float-left text-gray-600 text-sm mb-1 font-bold">Email:</label>
                        <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Entrez votre email" required />
                    </div>

                    <div className="mb-4">
                        <label className="block float-left text-gray-600 text-sm mb-1 font-bold">Mot de passe:</label>
                        <input type="password" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Entrez votre mot de passe" required />
                    </div>

                    <div className="mb-4 text-right">
                        <a href="#" className="text-blue-500 hover:underline">Mot de passe oublié ?</a>
                    </div>

                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">Se Connecter</button>

                    <div className="mt-4 text-center">
                        <a href="CreateCompte" className="text-blue-500 hover:underline">Créer un compte</a>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Connect;
