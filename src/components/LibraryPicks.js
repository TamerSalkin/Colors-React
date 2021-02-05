function LibraryPicks({ palette, setColors }) {
  const selectHandler = () => {
    setColors(palette.colors);
  };
  return (
    <div className="custom-palette">
      <h5>{palette.name}</h5>
      <div className="small-preview">
        {palette.colors.map((color) => (
          <div style={{ background: color.hexCode }} key={color.id}></div>
        ))}
      </div>
      <button className="pick-palette-btn" onClick={selectHandler}>
        Select
      </button>
    </div>
  );
}

export default LibraryPicks;
