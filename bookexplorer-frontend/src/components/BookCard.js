import React, { useState } from "react";
import api from "../api"; // axios instance

function BookCard({ book, showSave = false, onDelete = null }) {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [imgError, setImgError] = useState(false);


  const handleSave = async () => {
    try {
      setSaving(true);
      await api.post("/api/books/", {
        title: book.title,
        author: book.author || "Unknown",
        isbn: book.isbn || null,
        cover_url: book.cover_url || null,
        description: book.description || "",
        published_date: book.published_date || null,
      });
      setSaved(true);
    } catch (err) {
      console.error("Failed to save book:", err);
      alert("Error saving book. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!onDelete) return;
    if (!window.confirm("Are you sure you want to delete this book?")) return;

    try {
      setDeleting(true);
      await api.delete(`/api/books/${book.id}/`);
      onDelete(book.id); // notify parent (MyBooksPage) to remove from list
    } catch (err) {
      console.error("Failed to delete book:", err);
      alert("Error deleting book. Please try again.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 p-4 w-64 flex flex-col">
      
      {/* Cover */}
      <div className="w-full flex justify-center mb-3">
        {book.cover_url && !imgError ? (
          <img
            src={book.cover_url}
            alt={book.title}
            onError={() => setImgError(true)}
            className="w-32 h-48 object-cover rounded mb-2"
          />
        ) : (
          <div className="w-32 h-48 bg-gray-200 flex items-center justify-center mb-2 rounded">
            <span className="text-gray-500 text-sm text-center px-2">
              No Cover Available
            </span>
          </div>
        )}
      </div>

      {/* Title & Author */}
      <h3 className="text-base font-semibold text-gray-900 text-center line-clamp-2">
        {book.title}
      </h3>
      <p className="text-sm text-gray-500 text-center mt-1">
        {book.author || "Unknown Author"}
      </p>

      {/* Description */}
      {book.description && (
        <div className="mt-3 text-sm text-gray-700">
          <p className={expanded ? "" : "line-clamp-3"}>
            {book.description}
          </p>
          {book.description.length > 120 && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-blue-600 text-xs mt-1 hover:underline"
            >
              {expanded ? "Show Less" : "love to know more"}
            </button>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="mt-auto pt-4 flex flex-col gap-2">
        {showSave && (
          <button
            onClick={handleSave}
            disabled={saving || saved}
            className={`w-full py-2 rounded-md text-sm font-medium transition ${
              saved
                ? "bg-green-500 text-white"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {saved ? "Saved" : saving ? "Saving..." : "Save"}
          </button>
        )}

        {onDelete && (
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="w-full py-2 rounded-md text-sm font-medium bg-red-600 text-white hover:bg-red-700 transition"
          >
            {deleting ? "Deleting..." : "Delete"}
          </button>
        )}
      </div>
    </div>
  );
}

export default BookCard;
