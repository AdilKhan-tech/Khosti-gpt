function Pagination({ currentPage, pageCount, onPageChange, pageLimit, totalEntries }) {
    const MAX_PAGES_DISPLAYED = 5;

    const getPaginationRange = () => {
        const start = Math.max(2, currentPage - Math.floor(MAX_PAGES_DISPLAYED / 2));
        const end = Math.min(pageCount - 1, start + MAX_PAGES_DISPLAYED - 1);
        const range = [];

        if (start > 2) range.push('start-ellipsis');
        for (let i = start; i <= end; i++) {
            range.push(i);
        }
        if (end < pageCount - 1) range.push('end-ellipsis');

        return range;
    };

    const renderPageNumber = (pageNumber, index) => {
        if (pageNumber === 'start-ellipsis' || pageNumber === 'end-ellipsis') {
            return (
                <li key={`ellipsis-${index}`} className="page-item disabled d-flex align-items-center justify-content-center bg-white fw-500">
                    <span className="page-link d-flex align-items-center justify-content-center bg-white fw-500">...</span>
                </li>
            );
        }

        return (
            <li
                key={`page-${pageNumber}`}
                className={`page-item d-flex align-items-center justify-content-center bg-white fw-500 ${currentPage === pageNumber ? 'active' : ''}`}
                aria-current={currentPage === pageNumber ? "page" : undefined}
            >
                <a
                    className="page-link d-flex align-items-center justify-content-center bg-white fw-500"
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        onPageChange(pageNumber);
                    }}
                >
                    {pageNumber}
                </a>
            </li>
        );
    };

    return (
        <div className="pagination-Div d-flex justify-content-between align-items-center w-100">
            <div className="datatable-info text-muted mb-0">
                Showing <b>{(currentPage - 1) * pageLimit + 1}</b> out of{" "}
                <b>{totalEntries}</b> entries
            </div>

            <nav aria-label="Page navigation">
                <ul className="d-flex justify-content-between gap-3 mb-0">
                    <li className={`page-item d-flex align-items-center justify-content-center bg-white fw-500 ${currentPage === 1 ? 'disabled' : ''}`}>
                        <a
                            className="page-link rounded-2 d-flex align-items-center justify-content-center bg-white fw-500"
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                if (currentPage > 1) onPageChange(currentPage - 1);
                            }}
                        >
                            <i className="bi bi-chevron-left position-absolute"></i>
                        </a>
                    </li>

                    {currentPage > 1 && renderPageNumber(1)}
                    {getPaginationRange().map((pageNumber, index) =>
                        renderPageNumber(pageNumber, index)
                    )}
                    {currentPage < pageCount && renderPageNumber(pageCount)}

                    <li className={`page-item d-flex align-items-center justify-content-center bg-white fw-500 ${currentPage === pageCount ? 'disabled' : ''}`}>
                        <a
                            className="page-link rounded-2 d-flex align-items-center justify-content-center bg-white fw-500"
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                if (currentPage < pageCount) onPageChange(currentPage + 1);
                            }}
                        >
                            <i className="bi bi-chevron-right position-absolute"></i>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Pagination;
