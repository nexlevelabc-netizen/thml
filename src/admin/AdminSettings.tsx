import { useState } from 'react'
import AdminLayout from './AdminLayout'
import { AField, AButton, ATable, ARow, ACell, inputCls, trpc } from './controls'

export function AdminSettings() {
  const utils = trpc.useUtils()
  const users = trpc.auth.listAdminUsers.useQuery()

  const [newUser, setNewUser] = useState({ username: '', password: '', displayName: '' })
  const [pw, setPw] = useState({ current: '', next: '', confirm: '' })
  const [resetFor, setResetFor] = useState<number | null>(null)
  const [resetPw, setResetPw] = useState('')
  const [msg, setMsg] = useState<{ ok?: string; err?: string }>({})

  const refresh = () => utils.auth.listAdminUsers.invalidate()

  const createUser = trpc.auth.createAdminUser.useMutation({
    onSuccess: () => {
      setNewUser({ username: '', password: '', displayName: '' })
      setMsg({ ok: `User created.` })
      refresh()
    },
    onError: (e) => setMsg({ err: e.message }),
  })

  const updateUser = trpc.auth.updateAdminUser.useMutation({
    onSuccess: () => {
      setResetFor(null)
      setResetPw('')
      setMsg({ ok: 'User updated.' })
      refresh()
    },
    onError: (e) => setMsg({ err: e.message }),
  })

  const deleteUser = trpc.auth.deleteAdminUser.useMutation({
    onSuccess: () => {
      setMsg({ ok: 'User deleted.' })
      refresh()
    },
    onError: (e) => setMsg({ err: e.message }),
  })

  const changeOwn = trpc.auth.changeOwnPassword.useMutation({
    onSuccess: () => {
      setPw({ current: '', next: '', confirm: '' })
      setMsg({ ok: 'Your password has been changed.' })
    },
    onError: (e) => setMsg({ err: e.message }),
  })

  const submitCreate = () => {
    setMsg({})
    if (newUser.username.trim().length < 3) return setMsg({ err: 'Username must be at least 3 characters.' })
    if (!/^[a-zA-Z0-9_-]+$/.test(newUser.username.trim())) return setMsg({ err: 'Username: letters, numbers, - and _ only.' })
    if (newUser.password.length < 8) return setMsg({ err: 'Password must be at least 8 characters.' })
    createUser.mutate(newUser)
  }

  const submitChangeOwn = () => {
    setMsg({})
    if (pw.next.length < 8) return setMsg({ err: 'New password must be at least 8 characters.' })
    if (pw.next !== pw.confirm) return setMsg({ err: 'New passwords do not match.' })
    changeOwn.mutate({ currentPassword: pw.current, newPassword: pw.next })
  }

  return (
    <AdminLayout title="Settings">
      {msg.ok && <p className="mb-8 text-[14px] text-[#1d6151] border border-[#1d6151] px-5 py-3">{msg.ok}</p>}
      {msg.err && <p className="mb-8 text-[14px] text-[#a33] border border-[#a33] px-5 py-3">{msg.err}</p>}

      {/* Change your own password */}
      <section className="border border-[#dcd8cd] p-8 md:p-10 mb-12">
        <p className="label text-[#6e746f]">Account</p>
        <h2 className="font-display text-[22px] font-extrabold uppercase mt-3">Change your password</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          <AField label="Current password">
            <input type="password" className={inputCls} value={pw.current} onChange={(e) => setPw({ ...pw, current: e.target.value })} />
          </AField>
          <AField label="New password">
            <input type="password" className={inputCls} value={pw.next} onChange={(e) => setPw({ ...pw, next: e.target.value })} />
          </AField>
          <AField label="Confirm new password">
            <input type="password" className={inputCls} value={pw.confirm} onChange={(e) => setPw({ ...pw, confirm: e.target.value })} />
          </AField>
        </div>
        <div className="mt-8">
          <AButton label={changeOwn.isPending ? 'Saving…' : 'Change password'} onClick={submitChangeOwn} disabled={changeOwn.isPending} />
        </div>
        <p className="text-[12px] text-[#a9ada6] mt-4">
          If you signed in with the master account (set in server environment variables), the password must be changed in your
          hosting dashboard instead.
        </p>
      </section>

      {/* Create a new admin user */}
      <section className="border border-[#dcd8cd] p-8 md:p-10 mb-12">
        <p className="label text-[#6e746f]">Team</p>
        <h2 className="font-display text-[22px] font-extrabold uppercase mt-3">Add admin user</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          <AField label="Username">
            <input className={inputCls} placeholder="e.g. jsmith" value={newUser.username} onChange={(e) => setNewUser({ ...newUser, username: e.target.value })} />
          </AField>
          <AField label="Display name">
            <input className={inputCls} placeholder="e.g. John Smith" value={newUser.displayName} onChange={(e) => setNewUser({ ...newUser, displayName: e.target.value })} />
          </AField>
          <AField label="Password">
            <input type="password" className={inputCls} placeholder="8+ characters" value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} />
          </AField>
        </div>
        <div className="mt-8">
          <AButton label={createUser.isPending ? 'Creating…' : 'Create user'} onClick={submitCreate} disabled={createUser.isPending} />
        </div>
      </section>

      {/* Existing users */}
      <section className="border border-[#dcd8cd] p-8 md:p-10">
        <p className="label text-[#6e746f]">Team</p>
        <h2 className="font-display text-[22px] font-extrabold uppercase mt-3 mb-8">Admin users</h2>
        {users.isLoading ? (
          <p className="text-[14px] text-[#6e746f]">Loading…</p>
        ) : !users.data?.length ? (
          <p className="text-[14px] text-[#6e746f] leading-[1.7]">
            No additional admin users yet. Accounts you create here can sign in at the same admin login page with their own
            username and password.
          </p>
        ) : (
          <ATable head={['Username', 'Name', 'Status', 'Created', '']}>
            {users.data.map((u) => (
              <ARow key={u.id}>
                <ACell className="font-medium">{u.username}</ACell>
                <ACell>{u.displayName || '—'}</ACell>
                <ACell>{u.isActive ? 'Active' : 'Disabled'}</ACell>
                <ACell>{new Date(u.createdAt).toLocaleDateString('en-GB')}</ACell>
                <ACell>
                  {resetFor === u.id ? (
                    <span className="flex items-center gap-3">
                      <input
                        type="password"
                        className={inputCls + ' !py-2 text-[13px]'}
                        placeholder="New password"
                        value={resetPw}
                        onChange={(e) => setResetPw(e.target.value)}
                      />
                      <AButton
                        label="Save"
                        onClick={() => {
                          if (resetPw.length < 8) return setMsg({ err: 'Password must be at least 8 characters.' })
                          updateUser.mutate({ id: u.id, password: resetPw })
                        }}
                      />
                      <AButton label="Cancel" variant="outline" onClick={() => { setResetFor(null); setResetPw('') }} />
                    </span>
                  ) : (
                    <span className="flex items-center gap-3 flex-wrap">
                      <AButton label="Reset password" variant="outline" onClick={() => setResetFor(u.id)} />
                      <AButton
                        label={u.isActive ? 'Disable' : 'Enable'}
                        variant="outline"
                        onClick={() => updateUser.mutate({ id: u.id, isActive: !u.isActive })}
                      />
                      <AButton
                        label="Delete"
                        variant="danger"
                        onClick={() => {
                          if (window.confirm(`Delete user "${u.username}"? This cannot be undone.`)) deleteUser.mutate({ id: u.id })
                        }}
                      />
                    </span>
                  )}
                </ACell>
              </ARow>
            ))}
          </ATable>
        )}
      </section>
    </AdminLayout>
  )
}
