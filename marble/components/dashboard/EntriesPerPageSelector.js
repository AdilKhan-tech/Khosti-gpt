
function EntriesPerPageSelector({ pageLimit, onPageLimitChange }) {
    // const langCode = useLangCode();
    // const translations = useTranslation(langCode, "entriesPerpage");
    return (
      <div className="datatable-dropdown mob-donw ms-2">
      <div className=" d-flex align-items-center">
        <span className="me-2 showperpage">Show per page</span>
        <label>
          <select
            className="datatable-selector"
            value={pageLimit}
            onChange={(e) => onPageLimitChange(Number(e.target.value))}
          >
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
            <option value={150}>150</option>
            <option value={200}>200</option>
          </select>
        </label>
        </div>
      </div>
    );
  }
  
  export default EntriesPerPageSelector;
  