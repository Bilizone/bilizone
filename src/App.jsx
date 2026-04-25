import { useState } from 'react'
import { Routes, Route, Link, useNavigate, useParams } from 'react-router-dom'
import { Search, Menu, User, Plus, LogOut, Lock, Trash2 } from 'lucide-react'

// Dummy Data Awal
const initialVideos = [
  { id: 1, title: 'Tutorial React & Tailwind lengkap untuk pemula', embedUrl: 'https://www.youtube.com/embed/bMknfKXIFA8', category: 'Edukasi', isPremium: false, thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80' },
  { id: 2, title: 'Advanced React Patterns & Performance (Masterclass)', embedUrl: 'https://www.youtube.com/embed/Tn6-PIqc4UM', category: 'Programming', isPremium: true, thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80' },
  { id: 3, title: 'Kucing Lucu Bermain Piano', embedUrl: 'https://www.youtube.com/embed/cbP2N1BQdYc', category: 'Pets', isPremium: false, thumbnail: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&q=80' },
  { id: 4, title: 'Cara Membuat Website Portal Video', embedUrl: 'https://www.youtube.com/embed/p1oXbF1rRj8', category: 'Edukasi', isPremium: false, thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80' },
  { id: 5, title: 'Full Stack Next.js & Supabase Course (Premium)', embedUrl: 'https://www.youtube.com/embed/EwNJnEAxK00', category: 'Programming', isPremium: true, thumbnail: 'https://images.unsplash.com/photo-1627398246234-f3da3e1b7db7?w=800&q=80' },
  { id: 6, title: 'Mendaki Gunung Rinjani - Cinematic Vlog', embedUrl: 'https://www.youtube.com/embed/1B1PqD-2v0U', category: 'Hiburan', isPremium: false, thumbnail: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80' },
  { id: 7, title: 'Belajar Gitar Akustik Dasar', embedUrl: 'https://www.youtube.com/embed/T4CdH5X0P7g', category: 'Music', isPremium: false, thumbnail: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=800&q=80' },
  { id: 8, title: 'Resep Masakan Rumahan Mudah', embedUrl: 'https://www.youtube.com/embed/3Mv52ZlT-9s', category: 'Lifestyle', isPremium: false, thumbnail: 'https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=800&q=80' },
];

function App() {
  const [videos, setVideos] = useState(initialVideos);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  const addVideo = (newVideo) => {
    setVideos([{ ...newVideo, id: Date.now() }, ...videos]);
  };

  const deleteVideo = (id) => {
    if (window.confirm('Yakin ingin menghapus video ini?')) {
      setVideos(videos.filter(v => v.id !== id));
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0f172a] text-white">
      {/* Navbar Minimalis ala YouTube */}
      <nav className="border-b border-white/10 p-4 bg-slate-900/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Menu className="w-6 h-6 text-slate-400 cursor-pointer hover:text-white" />
            <Link to="/" className="text-2xl font-black bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent tracking-tighter">
              BILIZONE
            </Link>
          </div>
          
          {/* Search Bar Fiktif */}
          <div className="hidden md:flex items-center bg-slate-800 rounded-full border border-white/10 px-4 py-2 w-1/3">
            <Search className="w-5 h-5 text-slate-400 mr-2" />
            <input 
              type="text" 
              placeholder="Cari video..." 
              className="bg-transparent border-none outline-none w-full text-sm text-slate-200"
            />
          </div>

          <div className="flex items-center gap-4">
            <Link to="/admin" className="p-2 rounded-full hover:bg-slate-800 transition-colors">
              <User className="w-6 h-6 text-slate-300" />
            </Link>
          </div>
        </div>
      </nav>
      
      {/* Layout Utama */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Mini (opsional) */}
        <aside className="hidden lg:flex flex-col w-20 border-r border-white/10 bg-slate-900/50 p-4 items-center gap-8 pt-8">
          <Link to="/" className="flex flex-col items-center gap-1 text-slate-400 hover:text-white transition-colors">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
            <span className="text-[10px]">Home</span>
          </Link>
          <div className="flex flex-col items-center gap-1 text-slate-400 hover:text-white transition-colors cursor-pointer">
            <Search className="w-6 h-6" />
            <span className="text-[10px]">Eksplor</span>
          </div>
          <Link to="/admin" className="flex flex-col items-center gap-1 text-slate-400 hover:text-white transition-colors">
            <Lock className="w-6 h-6" />
            <span className="text-[10px]">Admin</span>
          </Link>
        </aside>

        <main className="flex-1 overflow-y-auto p-4 md:p-6 w-full">
          <Routes>
            <Route path="/" element={<Home videos={videos} />} />
            <Route path="/video/:id" element={<VideoPlayer videos={videos} />} />
            <Route path="/admin" element={<Admin 
              isLoggedIn={isAdminLoggedIn} 
              setIsLoggedIn={setIsAdminLoggedIn} 
              onAddVideo={addVideo}
              videos={videos}
              onDeleteVideo={deleteVideo}
            />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

function Home({ videos }) {
  return (
    <div className="space-y-6">
      {/* Grid Rapat - Banyak Video */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-8 gap-x-4">
        {videos.map(video => (
          <Link key={video.id} to={`/video/${video.id}`} className="group flex flex-col cursor-pointer">
            <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-slate-800 mb-3">
              <img 
                src={video.thumbnail || `https://source.unsplash.com/random/400x225/?${video.category}`} 
                alt={video.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {/* Premium Badge */}
              {video.isPremium && (
                <div className="absolute top-2 right-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg">
                  PREMIUM
                </div>
              )}
            </div>
            
            <div className="flex gap-3">
              <div className="w-9 h-9 rounded-full bg-slate-700 flex-shrink-0 flex items-center justify-center font-bold text-slate-400 overflow-hidden">
                <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${video.category}`} alt="Avatar" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col">
                <h3 className="text-sm font-semibold text-slate-100 group-hover:text-blue-400 transition-colors line-clamp-2 leading-tight">
                  {video.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1">{video.category}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function VideoPlayer({ videos }) {
  const { id } = useParams();
  const video = videos.find(v => v.id === parseInt(id));

  if (!video) {
    return <div className="text-center py-20 text-slate-400">Video tidak ditemukan.</div>;
  }

  return (
    <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-6">
      {/* Bagian Utama (Player) */}
      <div className="flex-1 space-y-4">
        <div className="aspect-video w-full bg-black rounded-xl overflow-hidden shadow-2xl border border-white/10">
          <iframe 
            src={video.embedUrl} 
            title={video.title}
            className="w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <div className="p-4 bg-slate-900/50 rounded-xl border border-white/5">
          <div className="flex items-start justify-between">
            <h1 className="text-2xl font-bold text-white">{video.title}</h1>
            {video.isPremium && (
              <span className="bg-purple-500/20 text-purple-300 border border-purple-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                Video Berbayar
              </span>
            )}
          </div>
          <div className="mt-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-700 overflow-hidden">
                <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${video.category}`} alt="Avatar" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="font-semibold text-sm">Bilizone Official</p>
              <p className="text-xs text-slate-400">{video.category}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Sidebar Rekomendasi */}
      <div className="w-full lg:w-[400px] flex flex-col gap-4">
        <h3 className="font-bold text-lg px-2">Rekomendasi</h3>
        {videos.filter(v => v.id !== video.id).slice(0, 5).map(v => (
          <Link key={v.id} to={`/video/${v.id}`} className="flex gap-3 group">
            <div className="w-40 aspect-video bg-slate-800 rounded-lg overflow-hidden relative flex-shrink-0">
               <img 
                src={v.thumbnail || `https://source.unsplash.com/random/400x225/?${v.category}`} 
                alt={v.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {v.isPremium && (
                <div className="absolute top-1 right-1 bg-purple-600 text-white text-[8px] font-bold px-1.5 py-0.5 rounded">
                  PREMIUM
                </div>
              )}
            </div>
            <div className="flex flex-col py-1">
              <h4 className="text-sm font-semibold text-slate-200 line-clamp-2 leading-snug group-hover:text-blue-400 transition-colors">{v.title}</h4>
              <p className="text-xs text-slate-400 mt-1">{v.category}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

function Admin({ isLoggedIn, setIsLoggedIn, onAddVideo, videos, onDeleteVideo }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Form State untuk tambah video
  const [title, setTitle] = useState('');
  const [embedUrl, setEmbedUrl] = useState('');
  const [category, setCategory] = useState('Edukasi');
  const [isPremium, setIsPremium] = useState(false);
  const [thumbnail, setThumbnail] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === 'mediakindo@gmail.com' && password === 'Gunawanabc456.') {
      setIsLoggedIn(true);
      setError('');
    } else {
      setError('Email atau password salah!');
    }
  };

  const handleSubmitVideo = (e) => {
    e.preventDefault();
    if (!title || !embedUrl) {
      alert('Judul dan URL Embed wajib diisi!');
      return;
    }
    
    onAddVideo({
      title,
      embedUrl,
      category,
      isPremium,
      thumbnail: thumbnail || `https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80` // Gambar default jika kosong
    });
    
    alert('Video berhasil ditambahkan ke beranda!');
    setTitle('');
    setEmbedUrl('');
    setThumbnail('');
    setIsPremium(false);
  };

  if (!isLoggedIn) {
    return (
      <div className="max-w-md mx-auto mt-20 p-8 glass-panel border border-white/10 rounded-2xl bg-slate-900/80 shadow-2xl">
        <div className="text-center mb-8">
          <Lock className="w-12 h-12 text-blue-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Admin Login</h2>
          <p className="text-slate-400 text-sm mt-2">Silakan masuk ke ruang kontrol Bilizone</p>
        </div>
        
        {error && <div className="bg-red-500/20 border border-red-500/50 text-red-200 p-3 rounded-lg text-sm mb-6 text-center">{error}</div>}
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-800 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="Masukkan email admin"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-800 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="••••••••"
            />
          </div>
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors mt-4">
            Masuk ke Control Room
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
        <div>
          <h2 className="text-2xl font-bold">Admin Control Room</h2>
          <p className="text-slate-400">Kelola video dan pengaturan Bilizone.</p>
        </div>
        <button 
          onClick={() => setIsLoggedIn(false)}
          className="flex items-center gap-2 text-slate-400 hover:text-red-400 transition-colors px-4 py-2 bg-slate-800 rounded-lg"
        >
          <LogOut className="w-4 h-4" /> Keluar
        </button>
      </div>

      <div className="glass-panel p-6 bg-slate-900/50 border border-white/10 rounded-2xl shadow-xl">
        <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <Plus className="w-5 h-5 text-blue-400" /> Tambah Video Baru (Embed)
        </h3>
        
        <form onSubmit={handleSubmitVideo} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Judul Video</label>
              <input 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-slate-800 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                placeholder="Contoh: Belajar Gitar..."
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Kategori</label>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-800 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
              >
                <option value="Edukasi">Edukasi</option>
                <option value="Hiburan">Hiburan</option>
                <option value="Programming">Programming</option>
                <option value="Music">Music</option>
                <option value="Pets">Pets</option>
                <option value="Lifestyle">Lifestyle</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">URL Embed Video</label>
            <input 
              type="url" 
              value={embedUrl}
              onChange={(e) => setEmbedUrl(e.target.value)}
              className="w-full bg-slate-800 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
              placeholder="Contoh: https://www.youtube.com/embed/xxxxx"
              required
            />
            <p className="text-xs text-slate-500 mt-1">Pastikan menggunakan link "embed", bukan link biasa.</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">URL Thumbnail Gambar (Opsional)</label>
            <input 
              type="url" 
              value={thumbnail}
              onChange={(e) => setThumbnail(e.target.value)}
              className="w-full bg-slate-800 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
              placeholder="Link gambar untuk cover (https://...)"
            />
          </div>

          <div className="bg-slate-800/50 p-4 rounded-lg border border-purple-500/20 flex items-start gap-3">
            <input 
              type="checkbox" 
              id="isPremium"
              checked={isPremium}
              onChange={(e) => setIsPremium(e.target.checked)}
              className="mt-1 w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-600"
            />
            <div>
              <label htmlFor="isPremium" className="font-semibold text-purple-300 cursor-pointer">
                Jadikan Video Premium (Berbayar)
              </label>
              <p className="text-xs text-slate-400 mt-1">
                Tandai ini jika video hanya bisa diakses oleh pelanggan berbayar di masa depan.
              </p>
            </div>
          </div>

          <button type="submit" className="w-full md:w-auto px-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold py-2.5 rounded-lg transition-colors shadow-lg shadow-purple-500/20">
            Posting Video
          </button>
        </form>
      </div>

      {/* Daftar Video Anda */}
      <div className="mt-8 glass-panel p-6 bg-slate-900/50 border border-white/10 rounded-2xl shadow-xl">
        <h3 className="text-xl font-semibold mb-6">Video Anda ({videos.length})</h3>
        
        <div className="space-y-4">
          {videos.length === 0 ? (
            <p className="text-slate-400 text-center py-8">Belum ada video yang diposting.</p>
          ) : (
            videos.map(video => (
              <div key={video.id} className="flex items-center gap-4 bg-slate-800/50 p-4 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                <div className="w-32 aspect-video rounded-lg overflow-hidden flex-shrink-0 bg-slate-900">
                  <img src={video.thumbnail || `https://source.unsplash.com/random/400x225/?${video.category}`} alt={video.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-slate-200 truncate">{video.title}</h4>
                  <div className="flex items-center gap-3 mt-1 text-xs">
                    <span className="text-slate-400">{video.category}</span>
                    {video.isPremium && <span className="text-purple-400 font-semibold bg-purple-500/10 px-2 py-0.5 rounded">Premium</span>}
                  </div>
                </div>
                <button 
                  onClick={() => onDeleteVideo(video.id)}
                  className="p-3 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors flex-shrink-0"
                  title="Hapus Video"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default App
