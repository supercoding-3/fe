import './tab.scss';

const Tab = ({
  tabMenu,
  activeTab,
  setActiveTab,
  ...props
}: {
  tabMenu: { id: string; name: string }[];
  activeTab: string;
  setActiveTab: (tabId: string) => void;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <div className="tab-container">
      <div className="tab">
        {tabMenu.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`tab__menu ${activeTab === tab.id ? 'tab__menu--active' : ''}`}
          >
            {tab.name}
          </button>
        ))}
      </div>
      <div className="tab-content">{props.children}</div>
    </div>
  );
};

export default Tab;
