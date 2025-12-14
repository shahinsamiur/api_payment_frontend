function TableContainer({ children }) {
  return (
    <div className="w-full overflow-hidden">
      <div className="grid">
        <div className="overflow-x-auto w-full overscroll-x-contain rounded-md border border-border">
          {children}
        </div>
      </div>
    </div>
  );
}

export default TableContainer;
