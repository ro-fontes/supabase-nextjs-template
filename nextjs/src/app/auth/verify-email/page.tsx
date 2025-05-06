"use client";

import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { createSPASassClient } from "@/lib/supabase/client";

export default function VerifyEmailPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const resendVerificationEmail = async () => {
    if (!email) {
      setError("Por favor insira seu endereço de e-mail");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const supabase = await createSPASassClient();
      const { error } = await supabase.resendVerificationEmail(email);
      if (error) {
        setError(error.message);
        return;
      }
      setSuccess(true);
    } catch (err: Error | unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Um erro desconhecido ocorreu");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Confira seu e-mail
        </h2>

        <p className="text-gray-600 mb-8">
          Nós enviamos um link de verificação para seu e-mail. Por favor, verifique
          sua caixa de entrada e clique no link para verificar sua conta.
        </p>

        <div className="space-y-4">
          <p className="text-sm text-gray-500">
            Não recebeu o e-mail? Verifique seu spam ou digite seu
            e-mail para reenviar:
          </p>

          {error && (
            <div className="text-sm text-red-600 bg-red-50 rounded-md p-3">
              {error}
            </div>
          )}

          {success && (
            <div className="text-sm text-green-600 bg-green-50 rounded-md p-3">
              O e-mail de verificação foi reenviado com sucesso.
            </div>
          )}

          <div className="mt-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu endereço de e-mail"
              className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 text-sm"
            />
          </div>

          <button
            className="text-primary-600 hover:text-primary-500 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={resendVerificationEmail}
            disabled={loading}
          >
            {loading ? "Enviando..." : "Clique aqui para reenviar"}
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <Link
            href="/auth/login"
            className="text-sm font-medium text-primary-600 hover:text-primary-500"
          >
            Voltar ao login
          </Link>
        </div>
      </div>
    </div>
  );
}
