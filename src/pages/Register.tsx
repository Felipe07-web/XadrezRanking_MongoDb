import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload } from 'lucide-react';

export default function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Cria o objeto do jogador
    const newPlayer = {
      id: Date.now().toString(), // Gera um ID único
      username,
      profileImage: preview || 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b',
      points: 0,
      rank: 0,
    };

    try {
      // Envia o jogador para o servidor JSON hospedado no Render
      await fetch('http://localhost:8080/players', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPlayer),
      });

      // Redireciona o usuário de volta para a página principal
      navigate('/');
    } catch (error) {
      console.error('Erro ao registrar jogador:', error);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-gray-900 text-white p-8 rounded-lg shadow-2xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold text-blue-400">Registrar Jogador</h1>
        <p className="text-gray-400 mt-2">Bem-vindo à nossa comunidade!</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Campo de nome de usuário */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">Nome de Usuário</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            required
          />
        </div>

        {/* Campo de upload de imagem */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">Adicionar Foto</label>
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-700 border-dashed rounded-lg cursor-pointer hover:border-blue-500 transition">
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-10 h-10 mb-4 text-gray-500" />
                  <p className="mb-2 text-sm text-gray-400">
                    Clique para carregar uma imagem de perfil
                  </p>
                </div>
              )}
              <input type="file" onChange={handleImageChange} className="hidden" accept="image/*" />
            </label>
          </div>
        </div>

        {/* Botão de envio */}
        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition shadow-lg hover:shadow-xl"
        >
          Registrar
        </button>
      </form>
    </div>
  );
}
