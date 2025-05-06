"use client";
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useGlobal } from '@/lib/context/GlobalContext';
import { createSPASassClient } from '@/lib/supabase/client';
import { Key, User, CheckCircle } from 'lucide-react';
import { MFASetup } from '@/components/MFASetup';

export default function UserSettingsPage() {
    const { user } = useGlobal();
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');



    const handlePasswordChange = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setError("As novas senhas não correspondem");
            return;
        }

        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const supabase = await createSPASassClient();
            const client = supabase.getSupabaseClient();

            const { error } = await client.auth.updateUser({
                password: newPassword
            });

            if (error) throw error;

            setSuccess('Senha atualizada com sucesso');
            setNewPassword('');
            setConfirmPassword('');
        } catch (err: Error | unknown) {
            if (err instanceof Error) {
                console.error('Erro ao atualizar senha:', err);
                setError(err.message);
            } else {
                console.error('Error updating password:', err);
                setError('Erro ao atualizar senha:');
            }
        } finally {
            setLoading(false);
        }
    };



    return (
        <div className="space-y-6 p-6">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">Configurações do Usuário</h1>
                <p className="text-muted-foreground">
                    Gerencie as configurações e preferências da sua conta
                </p>
            </div>

            {error && (
                <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            {success && (
                <Alert>
                    <CheckCircle className="h-4 w-4" />
                    <AlertDescription>{success}</AlertDescription>
                </Alert>
            )}

            <div className="grid gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <User className="h-5 w-5" />
                                Detalhes do Usuário
                            </CardTitle>
                            <CardDescription>Informações da sua conta</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-gray-500">ID do Usuário</label>
                                <p className="mt-1 text-sm">{user?.id}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500">Email</label>
                                <p className="mt-1 text-sm">{user?.email}</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Key className="h-5 w-5" />
                                Mudar Senha
                            </CardTitle>
                            <CardDescription>Atualize a senha da sua conta</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handlePasswordChange} className="space-y-4">
                                <div>
                                    <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">
                                        Nova Senha
                                    </label>
                                    <input
                                        type="password"
                                        id="new-password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 text-sm"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                                        Confirme sua Nova Senha
                                    </label>
                                    <input
                                        type="password"
                                        id="confirm-password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 text-sm"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
                                >
                                    {loading ? 'Atualizando...' : 'Atualizar Senha'}
                                </button>
                            </form>
                        </CardContent>
                    </Card>

                    <MFASetup
                        onStatusChange={() => {
                            setSuccess('Configurações da autenticação de dois fatores atualizadas com sucesso');
                        }}
                    />
                </div>
            </div>
        </div>
    );
}