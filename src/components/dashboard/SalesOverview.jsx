function SalesOverview({ data }) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const maxValue = Math.max(...data.map((d) => d.value));

  return (
    <div className="table-card">
      <div className="page-heading">
        <div>
          <span className="eyebrow">Revenue</span>
          <h2 style={{ margin: 0, fontSize: '1.4rem' }}>Sales overview</h2>
        </div>
      </div>
      <div className="sales-chart">
        {data.map((item, index) => (
          <div key={months[index]} className="sales-bar-group">
            <div className="sales-bar-track">
              <div
                className="sales-bar"
                style={{ height: `${(item.value / maxValue) * 100}%` }}
                title={`KSh ${item.value.toLocaleString()}`}
              />
            </div>
            <span className="sales-bar-label">{months[index]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SalesOverview;
