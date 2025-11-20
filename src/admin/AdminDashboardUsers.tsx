// src/admin/AdminDashboardUsers.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Import ini untuk cek user yang sedang login

// Base URL API
const API_BASE_URL = 'http://localhost:5111';

interface User {
  id: number;
  name: string;
  username: string;
  citizen_id: string;
  credit: number;
  role: 'admin' | 'member'; // Tambah tipe role
  created_at: string;
}

interface JwtPayload {
  username: string;
  role: string;
}

// ... (Helper Functions formatCurrency & formatDate TETAP SAMA seperti sebelumnya) ...
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
};

const formatDate = (dateString: string) => {
  if(!dateString) return '-';
  return new Date(dateString).toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};


export function AdminDashboardUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<string | null>(null); // Menyimpan username admin yang login

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  
  const navigate = useNavigate();

  // --- FUNGSI FETCH DATA ---
  const fetchUsers = async () => {
    const token = localStorage.getItem('token');
    if (!token) return navigate('/adminLogin');

    // Decode token untuk tahu siapa yang login
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      setCurrentUser(decoded.username);
    } catch (e) {
      console.error("Invalid token");
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/users`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.status === 401) return navigate('/adminLogin');
      
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Failed to fetch users", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // --- HANDLERS (LOGIKA FETCH TETAP SAMA, HANYA TAMBAH DATA ROLE DI BODY) ---

  const handleAddUser = async (newUser: any) => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${API_BASE_URL}/api/users`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newUser) // Role sudah ada di newUser
      });
      
      if (!res.ok) {
        const err = await res.json();
        alert(`Error: ${err.message}`);
        return;
      }

      await fetchUsers();
      setIsAddModalOpen(false);
    } catch (error) {
      alert('Failed to create user');
    }
  };

  const handleEditUser = async (updatedUser: User) => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${API_BASE_URL}/api/users/${updatedUser.id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: updatedUser.name,
          citizen_id: updatedUser.citizen_id,
          credit: updatedUser.credit,
          role: updatedUser.role // Kirim role baru
        })
      });

      if (!res.ok) throw new Error('Failed to update');
      
      await fetchUsers();
      setIsEditModalOpen(false);
      setSelectedUser(null);
    } catch (error) {
      alert('Failed to update user');
    }
  };

  const handleDeleteUser = async () => {
    if (!selectedUser) return;
    // Cek lagi untuk keamanan di frontend
    if (selectedUser.username === currentUser) {
        alert("You cannot delete your own account!");
        return;
    }

    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${API_BASE_URL}/api/users/${selectedUser.id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!res.ok) throw new Error('Failed to delete');

      await fetchUsers();
      setIsDeleteModalOpen(false);
      setSelectedUser(null);
    } catch (error) {
      alert('Failed to delete user');
    }
  };

  const openEditModal = (user: User) => { setSelectedUser(user); setIsEditModalOpen(true); };
  const openDeleteModal = (user: User) => { setSelectedUser(user); setIsDeleteModalOpen(true); };

  return (
    <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-lg text-gray-900">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
            <h1 className="text-2xl font-bold text-black uppercase tracking-wider">User List</h1>
            <p className="text-gray-600">Manage user accounts and credits.</p>
        </div>
        <button onClick={() => setIsAddModalOpen(true)} className="px-5 py-2 rounded-lg bg-cyan-500 text-white font-bold hover:bg-cyan-600 transition-colors shadow-lg flex items-center space-x-2">
          <span>+ Add User</span>
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
        <table className="min-w-full divide-y divide-gray-200 bg-white">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User Info</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Citizen ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Credit</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading ? <tr><td colSpan={6} className="text-center p-4">Loading...</td></tr> : users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{user.name}</div>
                  <div className="text-xs text-gray-500">@{user.username}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {/* Badge Role */}
                  <span className={`px-2 py-1 text-xs font-bold rounded-full ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'}`}>
                    {user.role.toUpperCase()}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{user.citizen_id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-cyan-600">{formatCurrency(user.credit)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right space-x-2">
                  <button onClick={() => openEditModal(user)} className="text-yellow-600 hover:text-yellow-800 font-bold">Edit</button>
                  
                  {/* Logic Proteksi: Jangan tampilkan tombol Delete jika itu akun sendiri */}
                  {user.username !== currentUser && (
                    <button onClick={() => openDeleteModal(user)} className="text-red-600 hover:text-red-800 font-bold">Delete</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODALS */}
      {isAddModalOpen && <AddUserModal onClose={() => setIsAddModalOpen(false)} onSave={handleAddUser} />}
      {isEditModalOpen && selectedUser && <EditUserModal user={selectedUser} currentUser={currentUser} onClose={() => setIsEditModalOpen(false)} onSave={handleEditUser} />}
      {isDeleteModalOpen && selectedUser && <DeleteUserModal user={selectedUser} onClose={() => setIsDeleteModalOpen(false)} onConfirm={handleDeleteUser} />}
    </div>
  );
}

// --- MODAL COMPONENTS (STYLED) ---

// Modal Add User
function AddUserModal({ onClose, onSave }: { onClose: () => void, onSave: (data: any) => void }) {
  const [formData, setFormData] = useState({ name: '', username: '', password: '', citizen_id: '', credit: 0, role: 'member' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 backdrop-blur-sm pt-6">
      {/* Style Modal: bg-white/90 backdrop-blur-sm */}
      <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-xl w-full max-w-md p-6 border border-white/20">
        <h2 className="text-xl font-bold mb-4 text-gray-900">Register New User</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input name="name" placeholder="Full Name" required className="w-full p-2 border border-gray-300 rounded bg-white/80 focus:ring-2 focus:ring-cyan-500" onChange={handleChange} />
          <input name="username" placeholder="Username" required className="w-full p-2 border border-gray-300 rounded bg-white/80 focus:ring-2 focus:ring-cyan-500" onChange={handleChange} />
          <input name="password" type="password" placeholder="Password" required className="w-full p-2 border border-gray-300 rounded bg-white/80 focus:ring-2 focus:ring-cyan-500" onChange={handleChange} />
          <input name="citizen_id" placeholder="Citizen ID (KTP)" required className="w-full p-2 border border-gray-300 rounded bg-white/80 focus:ring-2 focus:ring-cyan-500" onChange={handleChange} />
          
          {/* Pilihan Role */}
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">User Role</label>
            <select name="role" onChange={handleChange} className="w-full p-2 border border-gray-300 rounded bg-white/80">
                <option value="member">Member</option>
                <option value="admin">Admin</option>
            </select>
          </div>

          {/* Credit dengan Border CyanGrungeLight (cyan-500) */}
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">Initial Credit (IDR)</label>
            <input 
                name="credit" 
                type="number" 
                placeholder="0" 
                required 
                className="w-full p-2 border-2 border-cyan-500 rounded font-bold text-cyan-700 bg-white/80 focus:outline-none focus:ring-2 focus:ring-cyan-300" 
                onChange={handleChange} 
            />
          </div>
          
          <div className="flex justify-end space-x-2 mt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-cyan-500 text-white rounded hover:bg-cyan-600 font-bold shadow-md">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Modal Edit User
function EditUserModal({ user, currentUser, onClose, onSave }: { user: User, currentUser: string | null, onClose: () => void, onSave: (u: User) => void }) {
  const [formData, setFormData] = useState({ ...user });

  // Cek apakah ini user yang sedang login
  const isSelf = user.username === currentUser;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 backdrop-blur-sm pt-6">
      {/* Style Modal: bg-white/90 backdrop-blur-sm */}
      <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-xl w-full max-w-md p-6 border border-white/20">
        <h2 className="text-xl font-bold mb-4 text-gray-900">Edit User & Top Up</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="text-sm text-gray-500 mb-2">Username: <span className="font-mono text-black">@{user.username}</span></div>
          
          <input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="Name" className="w-full p-2 border border-gray-300 rounded bg-white/80" />
          <input value={formData.citizen_id} onChange={e => setFormData({...formData, citizen_id: e.target.value})} placeholder="KTP" className="w-full p-2 border border-gray-300 rounded bg-white/80" />
          
          {/* Pilihan Role (Disabled jika mengedit diri sendiri) */}
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">User Role</label>
            <select 
                value={formData.role} 
                onChange={e => setFormData({...formData, role: e.target.value as 'admin'|'member'})} 
                className="w-full p-2 border border-gray-300 rounded bg-white/80 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSelf} // Disable jika edit diri sendiri
            >
                <option value="member">Member</option>
                <option value="admin">Admin</option>
            </select>
            {isSelf && <p className="text-xs text-red-500 mt-1">*You cannot change your own role.</p>}
          </div>

          {/* Credit dengan Border CyanGrungeLight (cyan-500) */}
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">Credit Balance (IDR)</label>
            <input 
                type="number" 
                value={formData.credit} 
                onChange={e => setFormData({...formData, credit: parseInt(e.target.value) || 0})} 
                className="w-full p-2 border-2 border-cyan-500 rounded font-bold text-cyan-700 bg-white/80 focus:outline-none focus:ring-2 focus:ring-cyan-300" 
            />
          </div>
          
          <div className="flex justify-end space-x-2 mt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 font-bold shadow-md">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Modal Delete (Style Update)
function DeleteUserModal({ user, onClose, onConfirm }: { user: User, onClose: () => void, onConfirm: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-xl w-full max-w-md p-6 text-center border border-white/20">
        <h2 className="text-xl font-bold text-red-600 mb-2">Confirm Delete</h2>
        <p className="mb-6 text-gray-800">Are you sure you want to delete <span className="font-bold">{user.name}</span>?</p>
        <div className="flex justify-center space-x-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">Cancel</button>
          <button onClick={onConfirm} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 shadow-md font-bold">Delete</button>
        </div>
      </div>
    </div>
  );
}