import './AddSubmission.css';
import './FoundItemsList.css';
import { Link } from 'react-router-dom';

const FoundItemsLists = ({ items }) => {
  if (!items || items.length === 0) {
    return (
      <div className="submission-list">
        <h3>Found Items</h3>
        <p>No items found.</p>
      </div>
    );
  }

  return (
    <div className="submission-list">
      <h3>Found Items</h3>
      {items.map((item) => (
        <div key={item.id} className="submission-card">
          <h4>{item.itemName}</h4>
          <p><strong>Location:</strong> {item.location}</p>
          <p><strong>Date:</strong> {item.dateFound}</p>
          <p><strong>Description:</strong> {item.description}</p>
          <p><strong>Contact:</strong> {item.contactEmail}</p>
          {item.imageUrl && <img src={item.imageUrl} alt="Found item" />}
          
          <Link
            to="/contact"
            state={{ finderEmail: item.contactEmail }}
          >
            <button className="btn-contact">Contact Finder</button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default FoundItemsLists;
