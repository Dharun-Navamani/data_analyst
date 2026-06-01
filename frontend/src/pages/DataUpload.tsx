import { useState } from 'react';
import type { DragEvent } from 'react';
import { CloudUpload, Sparkles, ArrowRight } from 'lucide-react';
import apiClient from '../api/client';

const formats = ['Excel (.xlsx)', 'CSV (.csv)', 'JSON (.json)', 'Google Sheets'];

export default function DataUpload() {
  const [files, setFiles] = useState<File[]>([]);
  const [message, setMessage] = useState('');
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  function onDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    const fileList = Array.from(e.dataTransfer.files);
    setFiles(fileList);
  }

  function onDragOver(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
  }

  const handleFiles = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;
    setFiles(Array.from(selectedFiles));
  };

  async function upload() {
    if (files.length === 0) return;
    setUploading(true);
    setMessage('');
    setProgress(12);

    const form = new FormData();
    form.append('file', files[0]);

    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      setProgress(45);
      const res = await apiClient.post('/api/upload/upload', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setProgress(100);
      setMessage(`Uploaded ${res.data.name} with ${res.data.rows} rows.`);
      setFiles([]);
    } catch (err) {
      setMessage('Upload failed. Please try again.');
    } finally {
      setUploading(false);
      setTimeout(() => setProgress(0), 600);
    }
  }

  return (
    <div className="space-y-8">
      <section className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-950">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-violet-600 dark:text-violet-400">Upload Data</p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-950 dark:text-white">Drag & drop your analytics files</h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-400">
              Import data from Excel, CSV, JSON or Google Sheets and power the dashboard with automated AI analysis.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-3xl bg-slate-100 px-4 py-3 text-sm text-slate-700 dark:bg-slate-900 dark:text-slate-200">
            <Sparkles className="h-5 w-5 text-violet-600" />
            Recommended: Clean files with headers and UTF-8 encoding.
          </div>
        </div>

        <div
          onDrop={onDrop}
          onDragOver={onDragOver}
          className="mt-8 rounded-[32px] border-2 border-dashed border-slate-300 bg-slate-50 p-10 text-center transition hover:border-violet-500 hover:bg-white dark:border-slate-700 dark:bg-slate-900/80 dark:hover:border-violet-500"
        >
          <CloudUpload className="mx-auto h-14 w-14 text-violet-600" />
          <h2 className="mt-6 text-2xl font-semibold text-slate-950 dark:text-white">Drag & Drop Your Data Files</h2>
          <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">Supported formats:</p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            {formats.map((format) => (
              <span key={format} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
                {format}
              </span>
            ))}
          </div>

          <label className="mt-10 inline-flex cursor-pointer items-center gap-2 rounded-full bg-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:bg-violet-700">
            Browse files
            <input type="file" className="hidden" onChange={(e) => handleFiles(e.target.files)} />
          </label>

          <div className="mt-8 space-y-4 text-left">
            {files.length > 0 ? (
              <div className="space-y-3">
                <div className="rounded-3xl bg-white p-4 shadow-sm dark:bg-slate-900">
                  <p className="text-sm text-slate-500 dark:text-slate-400">Selected file</p>
                  <p className="mt-2 text-lg font-semibold text-slate-950 dark:text-white">{files[0].name}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{Math.round(files[0].size / 1024)} KB</p>
                </div>
                <button
                  type="button"
                  onClick={upload}
                  disabled={uploading}
                  className="inline-flex items-center gap-2 rounded-3xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {uploading ? 'Uploading...' : 'Upload file'}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div className="rounded-3xl border border-slate-200 bg-white p-6 text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
                <p>No file selected yet. Drop a dataset here to preview upload details.</p>
              </div>
            )}
          </div>

          {uploading && (
            <div className="mt-6 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
              <div className="h-2 rounded-full bg-violet-600 transition-all" style={{ width: `${progress}%` }} />
            </div>
          )}

          {message && <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">{message}</p>}
        </div>
      </section>

      <section className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-950">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">Recent uploads</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-950 dark:text-white">Latest datasets</h2>
          </div>
          <button className="rounded-3xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-200 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800">
            View all uploads
          </button>
        </div>
        <DatasetList />
      </section>
    </div>
  );
}

function DatasetList() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get('/api/upload/datasets');
      setItems(res.data || []);
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 space-y-4">
      <button
        type="button"
        onClick={load}
        className="rounded-3xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-200 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
      >
        {loading ? 'Refreshing...' : 'Refresh uploaded datasets'}
      </button>
      <div className="grid gap-4">
        {items.length ? (
          items.map((dataset) => (
            <div key={dataset.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{dataset.name}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{dataset.row_count} rows • {dataset.column_count ?? 'n/a'} columns</p>
                </div>
                <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700 dark:bg-violet-500/10 dark:text-violet-300">Uploaded</span>
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400">
            No recent uploads yet. Upload a dataset to populate this list.
          </div>
        )}
      </div>
    </div>
  );
}
