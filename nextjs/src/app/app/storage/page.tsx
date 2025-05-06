"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { useGlobal } from '@/lib/context/GlobalContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Upload, Download, Share2, Trash2, Loader2, FileIcon, AlertCircle, CheckCircle, Copy } from 'lucide-react';
import { createSPASassClient } from '@/lib/supabase/client';
import { FileObject } from '@supabase/storage-js';

export default function FileManagementPage() {
    const { user } = useGlobal();
    const [files, setFiles] = useState<FileObject[]>([]);
    const [uploading, setUploading] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [shareUrl, setShareUrl] = useState('');
    const [selectedFile, setSelectedFile] = useState<string | null>(null);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [fileToDelete, setFileToDelete] = useState<string | null>(null);
    const [showCopiedMessage, setShowCopiedMessage] = useState(false);
    const [isDragging, setIsDragging] = useState(false);

    useEffect(() => {
        if (user?.id) {
            loadFiles();
        }
    }, [user]);

    const loadFiles = async () => {
        try {
            setLoading(true);
            setError('');
            const supabase = await createSPASassClient();
            const { data, error } = await supabase.getFiles(user!.id);

            if (error) throw error;
            setFiles(data || []);
        } catch (err) {
            setError('Falha ao carregar arquivos');
            console.error('Error loading files:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleFileUpload = async (file: File) => {
        try {
            setUploading(true);
            setError('');

            console.log(user)

            const supabase = await createSPASassClient();
            const { error } = await supabase.uploadFile(user!.id!, file.name, file);

            if (error) throw error;

            await loadFiles();
            setSuccess('Arquivo enviado com sucesso');
        } catch (err) {
            setError('Falha ao enviar arquivo');
            console.error('Error uploading file:', err);
        } finally {
            setUploading(false);
        }
    };


    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = event.target.files;
        if (!fileList || fileList.length === 0) return;
        handleFileUpload(fileList[0]);
        event.target.value = '';
    };


    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const files = Array.from(e.dataTransfer.files);
        if (files.length > 0) {
            handleFileUpload(files[0]);
        }
    }, []);


    const handleDragEnter = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    }, []);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
    }, []);


    const handleDownload = async (filename: string) => {
        try {
            setError('');
            const supabase = await createSPASassClient();
            const { data, error } = await supabase.shareFile(user!.id!, filename, 60, true);

            if (error) throw error;

            window.open(data.signedUrl, '_blank');
        } catch (err) {
            setError('Falha ao baixar arquivo');
            console.error('Error downloading file:', err);
        }
    };

    const handleShare = async (filename: string) => {
        try {
            setError('');
            const supabase = await createSPASassClient();
            const { data, error } = await supabase.shareFile(user!.id!, filename, 24 * 60 * 60);

            if (error) throw error;

            setShareUrl(data.signedUrl);
            setSelectedFile(filename);
        } catch (err) {
            setError('Falha ao gerar o link compartilhável');
            console.error('Error sharing file:', err);
        }
    };

    const handleDelete = async () => {
        if (!fileToDelete) return;

        try {
            setError('');
            const supabase = await createSPASassClient();
            const { error } = await supabase.deleteFile(user!.id!, fileToDelete);

            if (error) throw error;

            await loadFiles();
            setSuccess('Arquivo deletado com sucesso');
        } catch (err) {
            setError('Falha ao deletar arquivo');
            console.error('Error deleting file:', err);
        } finally {
            setShowDeleteDialog(false);
            setFileToDelete(null);
        }
    };

    const copyToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setShowCopiedMessage(true);
            setTimeout(() => setShowCopiedMessage(false), 2000);
        } catch (err) {
            console.error('Falha ao copiar arquivo:', err);
            setError('Falha ao copiar o arquivo para a área de transferência');
        }
    };


    return (
        <div className="space-y-6 p-6">
            <Card>
                <CardHeader>
                    <CardTitle>Gerenciamento de Arquivos</CardTitle>
                    <CardDescription>Envie, baixe, e compartilhe seus arquivos</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {error && (
                        <Alert variant="destructive" className="mb-4">
                            <AlertCircle className="h-4 w-4"/>
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    {success && (
                        <Alert className="mb-4">
                            <CheckCircle className="h-4 w-4"/>
                            <AlertDescription>{success}</AlertDescription>
                        </Alert>
                    )}

                    <div className="flex items-center justify-center w-full">
                        <label
                            className={`w-full flex flex-col items-center px-4 py-6 bg-white rounded-lg shadow-lg tracking-wide border-2 cursor-pointer transition-colors ${
                                isDragging
                                    ? 'border-primary-500 border-dashed bg-primary-50'
                                    : 'border-primary-600 hover:bg-primary-50'
                            }`}
                            onDragEnter={handleDragEnter}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                        >
                            <Upload className="w-8 h-8"/>
                            <span className="mt-2 text-base">
                                {uploading
                                    ? 'Enviando...'
                                    : isDragging
                                        ? 'Solte seus arquivos aqui'
                                        : 'Arraste e solte ou clique para selecionar um arquivo (max 50mb)'}
                            </span>
                            <input
                                type="file"
                                className="hidden"
                                onChange={handleInputChange}
                                disabled={uploading}
                            />
                        </label>
                    </div>

                    <div className="space-y-4">
                        {loading && (
                            <div className="flex items-center justify-center">
                                <Loader2 className="w-6 h-6 animate-spin"/>
                            </div>
                        )}
                        {files.length === 0 ? (
                            <p className="text-center text-gray-500">Sem arquivos enviados ainda</p>
                        ) : (
                            files.map((file) => (
                                <div
                                    key={file.name}
                                    className="flex items-center justify-between p-4 bg-white rounded-lg border"
                                >
                                    <div className="flex items-center space-x-3">
                                        <FileIcon className="h-6 w-6 text-gray-400"/>
                                        <span className="font-medium">{file.name.split('/').pop()}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <button
                                            onClick={() => handleDownload(file.name)}
                                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                                            title="Baixar"
                                        >
                                            <Download className="h-5 w-5"/>
                                        </button>
                                        <button
                                            onClick={() => handleShare(file.name)}
                                            className="p-2 text-green-600 hover:bg-green-50 rounded-full transition-colors"
                                            title="Compartilhar"
                                        >
                                            <Share2 className="h-5 w-5"/>
                                        </button>
                                        <button
                                            onClick={() => {
                                                setFileToDelete(file.name);
                                                setShowDeleteDialog(true);
                                            }}
                                            className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                                            title="Apagar"
                                        >
                                            <Trash2 className="h-5 w-5"/>
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Share Dialog */}
                    <Dialog open={Boolean(shareUrl)} onOpenChange={() => {
                        setShareUrl('');
                        setSelectedFile(null);
                    }}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Compartilhar {selectedFile?.split('/').pop()}</DialogTitle>
                                <DialogDescription>
                                    Copie o link abaixo para compartilhar seu arquivo. Esse link irá expirar em 24 horas.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="flex items-center space-x-2">
                                <input
                                    type="text"
                                    value={shareUrl}
                                    readOnly
                                    className="flex-1 p-2 border rounded bg-gray-50"
                                />
                                <button
                                    onClick={() => copyToClipboard(shareUrl)}
                                    className="p-2 text-primary-600 hover:bg-primary-50 rounded-full transition-colors relative"
                                >
                                    <Copy className="h-5 w-5"/>
                                    {showCopiedMessage && (
                                        <span
                                            className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded">
                                            Copiado!
                                        </span>
                                    )}
                                </button>
                            </div>
                        </DialogContent>
                    </Dialog>

                    {/* Delete Confirmation Dialog */}
                    <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Apagar arquivo</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Você tem certeza que deseja apagar esse arquivo? Essa ação não pode ser desfeita.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
                                    Apagar
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </CardContent>
            </Card>
        </div>
    );
}