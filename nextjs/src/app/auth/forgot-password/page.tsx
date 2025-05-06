'use client';

import { useState } from 'react';
import { createSPASassClient } from '@/lib/supabase/client';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const supabase = await createSPASassClient();
            const { error } = await supabase.getSupabaseClient().auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/auth/reset-password`,
            });

            if (error) throw error;

            setSuccess(true);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Um erro desconhecido ocorreu');
            }
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <div className="text-center">
                    <div className="flex justify-center mb-4">
                        <CheckCircle className="h-16 w-16 text-green-500" />
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        Verifique seu e-mail
                    </h2>

                    <p className="text-gray-600 mb-8">
                        Enviamos um link para redefinição de senha para seu endereço de email.
                        Verifique sua caixa de entrada e siga as instruções para redefinir sua senha.
                    </p>

                    <div className="mt-6 text-center text-sm">
                        <Link href="/auth/login" className="font-medium text-primary-600 hover:text-primary-500">
                            Voltar ao login
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
                    Redefinir sua senha
                </h2>
            </div>

            {error && (
                <div className="mb-4 p-4 text-sm text-red-700 bg-red-100 rounded-lg">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Endereço de email
                    </label>
                    <div className="mt-1">
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500"
                        />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                        Digite seu endereço de e-mail e lhe enviaremos um link para redefinir sua senha.
                    </p>
                </div>

                <div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex w-full justify-center rounded-md border border-transparent bg-primary-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50"
                    >
                        {loading ? 'Enviando link de redefinição...' : 'Enviar link de redefinição'}
                    </button>
                </div>
            </form>

            <div className="mt-6 text-center text-sm">
                <span className="text-gray-600">Lembra sua senha?</span>
                {' '}
                <Link href="/auth/login" className="font-medium text-primary-600 hover:text-primary-500">
                    Entrar
                </Link>
            </div>
        </div>
    );
}