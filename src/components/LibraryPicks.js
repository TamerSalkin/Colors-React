function LibraryPicks({
  id,
  palette,
  setColors,
  localLibrary,
  setLocalLibrary,
}) {
  const selectHandler = () => {
    setColors(palette.colors);
  };
  const deleteHandler = () => {
    let localPalettes = [...localLibrary];
    localPalettes = localPalettes.filter(
      (item) => localPalettes.indexOf(item) !== id
    );
    setLocalLibrary(localPalettes);
  };
  return (
    <div className="custom-palette">
      <h5>{palette.name}</h5>
      <div className="small-preview">
        {palette.colors.map((color) => (
          <div style={{ background: color.hexCode }} key={color.id}></div>
        ))}
      </div>
      <div className="buttons">
        <button className="pick-palette-btn" onClick={selectHandler}>
          Select
        </button>
        <button className="pick-palette-btn delete-btn" onClick={deleteHandler}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default LibraryPicks;
