import React, { useState } from 'react';

// 1. Definisikan tipe User berdasarkan schema DB Anda
interface User {
  id: number;
  name: string;
  citizen_id: string; // NIK / KTP
  credit: number;
  created_at: string;
}

// 2. Data dummy untuk ditampilkan (nanti Anda ganti dengan data dari API)
const MOCK_USERS: User[] = [
  { id: 1, name: 'John Doe', citizen_id: '3201234567890001', credit: 50000, created_at: '2025-10-10T10:00:00Z' },
  { id: 2, name: 'Jane Smith', citizen_id: '3201234567890002', credit: 15000, created_at: '2025-10-11T11:30:00Z' },
  { id: 3, name: 'Asep Sunandar', citizen_id: '3201234567890003', credit: 0, created_at: '2025-10-12T14:45:00Z' },
];

// --- Helper Functions untuk Format ---

// Format Angka ke Rupiah (IDR)
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
};
// Format string ISO Date ke tanggal lokal
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

// 3. Komponen Utama Halaman User
export function AdminDashboardUsers() {
  const [users, setUsers] = useState(MOCK_USERS);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // --- Handler untuk Aksi (simulasi) ---
  // Buka modal Edit dan set user yang dipilih
  const openEditModal = (user: User) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };
  // Buka modal Delete dan set user yang dipilih
  const openDeleteModal = (user: User) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };
  // Handler untuk menyimpan user baru
  const handleAddUser = (newUser: Omit<User, 'id' | 'created_at'>) => {
    // Simulasi penambahan user baru
    const userToAdd: User = {
      ...newUser,
      id: Math.floor(Math.random() * 10000), // ID acak (ganti dengan ID dari DB)
      created_at: new Date().toISOString(),
    };
    setUsers([userToAdd, ...users]);
    setIsAddModalOpen(false);
  };
  // Handler untuk menyimpan user yang di-edit
  // Ini juga menangani REVISI 1 (admin topup user)
  const handleEditUser = (updatedUser: User) => {
    // Simulasi update user
    setUsers(users.map(u => (u.id === updatedUser.id ? updatedUser : u)));
    setIsEditModalOpen(false);
    setSelectedUser(null);
  };
  // Handler untuk menghapus user
  const handleDeleteUser = () => {
    if (!selectedUser) return;
    // Simulasi delete user
    setUsers(users.filter(u => u.id !== selectedUser.id));
    setIsDeleteModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-lg text-gray-900">
      
      {/* --- Header Halaman --- */}
      <div className="flex justify-between items-center mb-6">
        <div>
            <h1 className="text-2xl font-bold text-black uppercase tracking-wider">User List</h1>
            <p className="text-gray-600">Manage user accounts and credits.</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-5 py-2 rounded-lg bg-cyan-500 text-white font-bold hover:bg-cyan-600 transition-colors shadow-lg flex items-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
          <span>Add User</span>
        </button>
      </div>

      {/* --- Tabel User --- */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
        <table className="min-w-full divide-y divide-gray-200 bg-white">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Citizen ID (KTP)</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Credit</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Member Since</th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{user.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-700">{user.citizen_id}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className={`text-sm font-bold ${user.credit > 0 ? 'text-cyanGrungeLight' : 'text-pinkGrungeLight'}`}>
                    {formatCurrency(user.credit)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-700">{formatDate(user.created_at)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                  <button onClick={() => openEditModal(user)} className="p-2 rounded-md bg-yellow-100 text-yellow-700 hover:bg-yellow-200 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.536L16.732 3.732z" /></svg>
                  </button>
                  <button onClick={() => openDeleteModal(user)} className="p-2 rounded-md bg-red-100 text-red-700 hover:bg-red-200 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- Area Modal --- */}
      {isAddModalOpen && (
        <AddUserModal
          onClose={() => setIsAddModalOpen(false)}
          onSave={handleAddUser}
        />
      )}
      {isEditModalOpen && selectedUser && (
        <EditUserModal
          user={selectedUser}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleEditUser}
        />
      )}
      {isDeleteModalOpen && selectedUser && (
        <DeleteUserModal
          user={selectedUser}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDeleteUser}
        />
      )}

    </div>
  );
}

// Modal untuk Add User
function AddUserModal({ onClose, onSave }: { onClose: () => void, onSave: (user: Omit<User, 'id' | 'created_at'>) => void }) {
  const [name, setName] = useState('');
  const [citizenId, setCitizenId] = useState('');
  const [credit, setCredit] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ name, citizen_id: citizenId, credit });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Add New User</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormInput label="Full Name" type="text" value={name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} required />
          <FormInput label="Citizen ID (KTP)" type="text" value={citizenId} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCitizenId(e.target.value)} required />
          <FormInput label="Initial Credit" type="number" value={credit} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCredit(parseInt(e.target.value) || 0)} required />
          <div className="flex justify-end space-x-3 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300">Cancel</button>
            <button type="submit" className="px-4 py-2 rounded-lg bg-cyan-500 text-white hover:bg-cyan-600">Save User</button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Modal untuk Edit User
// + admin topup user
function EditUserModal({ user, onClose, onSave }: { user: User, onClose: () => void, onSave: (user: User) => void }) {
  const [name, setName] = useState(user.name);
  const [citizenId, setCitizenId] = useState(user.citizen_id);
  const [credit, setCredit] = useState(user.credit);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...user, name, citizen_id: citizenId, credit });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Edit User: {user.name}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormInput label="Full Name" type="text" value={name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} required />
          <FormInput label="Citizen ID (KTP)" type="text" value={citizenId} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCitizenId(e.target.value)} required />
          <FormInput label="User Credit (Top-Up)" type="number" value={credit} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCredit(parseInt(e.target.value) || 0)} required />
          <div className="flex justify-end space-x-3 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300">Cancel</button>
            <button type="submit" className="px-4 py-2 rounded-lg bg-yellow-500 text-white hover:bg-yellow-600">Update User</button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Modal untuk Konfirmasi Delete
function DeleteUserModal({ user, onClose, onConfirm }: { user: User, onClose: () => void, onConfirm: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative">
        <div className="flex justify-center mb-4">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            </div>
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2 text-center">Delete User</h2>
        <p className="text-gray-600 text-center mb-6">
          Are you sure you want to delete <span className="font-bold">{user.name}</span>? This action cannot be undone.
        </p>
        <div className="flex justify-center space-x-4">
          <button type="button" onClick={onClose} className="px-6 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300">Cancel</button>
          <button type="submit" onClick={onConfirm} className="px-6 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700">Delete</button>
        </div>
      </div>
    </div>
  );
}


// Komponen helper untuk Input Form
function FormInput({ label, ...props }: { label: string, [key: string]: any }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        {...props}
        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm text-gray-900"
      />
    </div>
  );
}