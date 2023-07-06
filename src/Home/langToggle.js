const LangToggle = ({ lang, toggle }) => {
  return (
    <div className="lang-selector">
      <p className={lang !== "EN" && "opacity"}>🇺🇸</p>
      <label class="switch btn-color-mode-switch">
        <input
          type="checkbox"
          name="color_mode"
          id="color_mode"
          value="1"
          onChange={toggle}
        />
        <label
          for="color_mode"
          data-on="PT"
          data-off="EN"
          class="btn-color-mode-switch-inner"
        ></label>
      </label>
      <p className={lang !== "PT" && "opacity"}>🇧🇷</p>
    </div>
  );
};

export default LangToggle;
