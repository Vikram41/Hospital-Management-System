export default function Card({ title, content, actions }) {
    return (
      <div className="card">
        <h3>{title}</h3>
        <p>{content}</p>
        <div className="card-actions">
          {actions &&
            actions.map((action, index) => (
              <button key={index} onClick={action.onClick}>
                {action.label}
              </button>
            ))}
        </div>
        <style jsx>{`
          .card {
            border: 1px solid #ccc;
            border-radius: 8px;
            padding: 16px;
            margin: 8px;
            background-color: #f9f9f9;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .card-actions button {
            margin-right: 8px;
            background-color: #2e7d32;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 4px;
            cursor: pointer;
          }
          .card-actions button:hover {
            background-color: #1b5e20;
          }
        `}</style>
      </div>
    );
  }
  