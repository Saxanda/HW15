import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllPosts } from '../api';
import type { NewsPost, PaginatedNewsResponse } from '../api';

function HomePage() {
    const [posts, setPosts] = useState<NewsPost[]>([]);
    const [page, setPage] = useState(0);
    const [size] = useState(5);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        getAllPosts(page, size)
            .then((data: PaginatedNewsResponse) => {
                setPosts(data.items);
                setTotal(data.total);
            })
            .catch(console.error);
    }, [page, size]);

    const totalPages = Math.ceil(total / size);

    return (
        <div className="container">
            <div className="page-header">
                <h1>Board News</h1>
                <Link to="/create" className="button">Add news</Link>
            </div>

            <div className="news-list">
                {posts.map((post) => (
                    <Link key={post.id} to={`/news/${post.id}`} className="news-card">
                        <h2>{post.title}</h2>
                        <p className="clamp-text">{post.text}</p>
                        <p><strong>Author:</strong> {post.authorEmail}</p>
                    </Link>
                ))}
            </div>

            <div className="actions">
                <button
                    type="button"
                    className="button secondary"
                    onClick={() => setPage((prev) => prev - 1)}
                    disabled={page === 0}
                >
                    Prev
                </button>

                <span>
          Page {page + 1} of {totalPages || 1}
        </span>

                <button
                    type="button"
                    className="button secondary"
                    onClick={() => setPage((prev) => prev + 1)}
                    disabled={page + 1 >= totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default HomePage;