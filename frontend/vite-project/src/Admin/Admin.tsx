import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABLES = [
  'requests', 'projects', 'news_posts', 'vacancies', 'users',
  'services', 'service_offers', 'service_steps',
  'pricing_plans', 'pricing_features',
  'project_categories', 'project_solutions', 'testimonials',
  'news_categories', 'comments',
  'offices', 'team_members', 'company_history',
  'statistics', 'advantages', 'partners', 'clients',
  'cv_applications', 'subscribers',
];

export function Admin() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string>('');
  const [activeTable, setActiveTable] = useState<string>('requests');
  const [rows, setRows] = useState<any[]>([]);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [editId, setEditId] = useState<number | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const saved = localStorage.getItem('user');
    const user = saved ? JSON.parse(saved) : null;
    if (!user || user.role !== 'admin') {
      navigate('/auth');
      return;
    }
    setUserId(String(user.id));
  }, [navigate]);

  const fetchTable = (table: string, uid: string) => {
    setError('');
    fetch(`http://localhost:3000/api/admin/${table}`, {
      headers: { 'x-user-id': uid },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setRows(data);
          // Инициализируем пустую форму по колонкам первой записи (кроме id и created_at)
          if (data.length > 0 && !editId) {
            const empty: Record<string, any> = {};
            Object.keys(data[0]).forEach((k) => {
              if (k !== 'id' && k !== 'created_at' && k !== 'role') empty[k] = '';
            });
            setFormData(empty);
          }
        }
      })
      .catch(() => setError('Ошибка загрузки данных'));
  };

  useEffect(() => {
    if (userId) {
      setEditId(null);
      setFormData({});
      fetchTable(activeTable, userId);
    }
  }, [activeTable, userId]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const payload: Record<string, any> = {};
    Object.entries(formData).forEach(([k, v]) => {
      if (v !== '' && k !== 'id' && k !== 'created_at' && k !== 'role') {
        payload[k] = v;
      }
    });

    const url = editId
      ? `http://localhost:3000/api/admin/${activeTable}/${editId}`
      : `http://localhost:3000/api/admin/${activeTable}`;

    const res = await fetch(url, {
      method: editId ? 'PUT' : 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-user-id': userId,
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.error || 'Ошибка сохранения');
      return;
    }

    setEditId(null);
    fetchTable(activeTable, userId);
  };

  const handleEditClick = (row: any) => {
    setEditId(row.id);
    const copy: Record<string, any> = {};
    Object.keys(row).forEach((k) => {
      if (k !== 'id' && k !== 'created_at' && k !== 'role') {
        copy[k] = row[k] ?? '';
      }
    });
    setFormData(copy);
  };

  const handleDelete = async (id: number) => {
    await fetch(`http://localhost:3000/api/admin/${activeTable}/${id}`, {
      method: 'DELETE',
      headers: { 'x-user-id': userId },
    });
    fetchTable(activeTable, userId);
  };

  const columns = rows.length > 0 ? Object.keys(rows[0]) : [];
  const formFields = Object.keys(formData);

  return (
    <section className="w-full py-[60px] flex justify-center bg-[#F4F5F7] font-ubuntu min-h-screen">
      <div className="max-w-[1230px] w-full flex flex-col gap-[32px]">
        <div className="flex flex-col gap-[16px]">
          <h1 className="text-[40px] font-extrabold text-[#1E212C]">Admin Panel</h1>
          <div className="flex flex-wrap gap-[8px]">
            {TABLES.map((t) => (
              <button key={t} onClick={() => setActiveTable(t)} className={`px-[16px] h-[38px] rounded-xs text-[13px] font-bold cursor-pointer transition-colors ${activeTable === t ? 'bg-[#FF5A30] text-white' : 'bg-white text-[#424551] hover:text-[#FF5A30]'}`}>{t}</button>
            ))}
          </div>
        </div>

        {error && <p className="text-[14px] text-[#FF5A30] bg-[#FF5A30]/10 p-[12px] rounded-xs">{error}</p>}

        {/* ФОРМА ДОБАВЛЕНИЯ / РЕДАКТИРОВАНИЯ (кроме таблицы users, где создаются через регистрацию) */}
        {formFields.length > 0 && (activeTable !== 'users' || editId !== null) && (
          <form onSubmit={handleSave} className="bg-white rounded-xs shadow-sm p-[24px] flex flex-col gap-[16px]">
            <h2 className="text-[20px] font-bold text-[#1E212C]">{editId ? `Edit #${editId} in ${activeTable}` : `Add new to ${activeTable}`}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[16px]">
              {formFields.map((field) => (
                <div key={field} className="flex flex-col gap-[6px]">
                  <label className="text-[13px] font-bold text-[#424551]">{field}</label>
                  <input type="text" value={formData[field]} onChange={(e) => setFormData({ ...formData, [field]: e.target.value })} placeholder={field} className="h-[40px] bg-[#F4F5F7] border border-[#D7D9DF] rounded-xs text-[14px] text-[#1E212C] outline-none focus:border-[#FF5A30] indent-[12px]" />
                </div>
              ))}
            </div>
            <div className="flex gap-[12px] mt-[8px]">
              <button type="submit" className="px-[28px] h-[42px] bg-[#FF5A30] text-white text-[14px] font-bold uppercase rounded-xs hover:bg-[#e04e28] cursor-pointer">{editId ? 'Save' : 'Add'}</button>
              {editId && (
                <button type="button" onClick={() => { setEditId(null); fetchTable(activeTable, userId); }} className="px-[20px] h-[42px] border border-[#D7D9DF] text-[#424551] text-[14px] font-bold rounded-xs cursor-pointer">Cancel</button>
              )}
            </div>
          </form>
        )}

        {/* ТАБЛИЦА ДАННЫХ */}
        <div className="bg-white rounded-xs shadow-sm p-[24px] overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E5E8ED] text-[13px] font-bold text-[#787A80] uppercase">
                {columns.map((col) => (
                  <th key={col} className="py-[12px] px-[12px]">{col}</th>
                ))}
                <th className="py-[12px] px-[12px] text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className="border-b border-[#E5E8ED] text-[14px] text-[#1E212C] hover:bg-[#F4F5F7]/50">
                  {columns.map((col) => (
                    <td key={col} className="py-[12px] px-[12px] max-w-[240px] truncate">{String(row[col] ?? '')}</td>
                  ))}
                  <td className="py-[12px] px-[12px] flex justify-end gap-[8px]">
                    <button onClick={() => handleEditClick(row)} className="px-[12px] h-[34px] border border-[#FF5A30] text-[#FF5A30] text-[13px] font-bold rounded-xs hover:bg-[#FF5A30] hover:text-white cursor-pointer">Edit</button>
                    <button onClick={() => handleDelete(row.id)} className="px-[12px] h-[34px] bg-red-600 text-white text-[13px] font-bold rounded-xs hover:bg-red-700 cursor-pointer">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default Admin
