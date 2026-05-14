export default function Panel({ children, className = "" }) {
    return (
        <section className = {`app-surface rounded-3xl ${className}`}>
            {children}
        </section>
    );
}
