
import "./pagination.css"

export default function Pagination(props) {

    const generatedPages = [];
    for (let i = 1; i <= props.pages; i++) {
        generatedPages.push(i)
    }

    return (
        <div className="pagination">
            <button
                onClick={() =>
                    props.setCurrentPage(current => current - 1)}
                className="page previous"
                disabled={props.currentPage === 1}
            >
                Previous</button>
            {generatedPages.map(pageNum => (
                <div
                    onClick={() => props.setCurrentPage(pageNum)}
                    key={pageNum}
                    className={props.currentPage === pageNum ? "page active" : "page"}
                >
                    {pageNum}
                </div>
            ))}
            <button
                onClick={() =>
                    props.setCurrentPage(current => current + 1)}
                disabled={props.currentPage
                    ===
                    props.pages}
                className="page next">
                Next</button>
        </div>
    )
}