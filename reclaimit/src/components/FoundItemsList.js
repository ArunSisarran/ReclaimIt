import './AddSubmission.css';
import './FoundItemsList.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import FirestoreService from './FirestoreService';

const FoundItemsLists = ({ items, onItemUpdated }) => {
  const [updating, setUpdating] = useState(false);

  const markReturned = async (itemId, email) => {
    const checkEmail = window.prompt('Enter your email to confirm:');
    
    if (!checkEmail) {
      return;
    }
    
    if (checkEmail !== email) {
      alert('Email doesnt match!');
      return;
    }

    const sure = window.confirm('Mark this item as returned?');
    if (!sure) return;

    setUpdating(true);

    try {
      await FirestoreService.updateItem(itemId, { 
        status: 'returned',
        returnedDate: new Date().toLocaleDateString()
      });
      
      alert('Item marked as returned!');
      
      if (onItemUpdated) {
        onItemUpdated();
      }
    } catch (error) {
      alert('Error updating item');
      console.log(error);
    }
    
    setUpdating(false);
  };

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
          {item.status === 'returned' && (
            <div style={{backgroundColor: 'green', color: 'white', padding: '5px', borderRadius: '5px', marginBottom: '10px', textAlign: 'center'}}>
              RETURNED ✓
            </div>
          )}
          
          <h4>{item.itemName}</h4>
          <p><strong>Location:</strong> {item.location}</p>
          <p><strong>Date:</strong> {item.dateFound}</p>
          <p><strong>Description:</strong> {item.description}</p>
          <p><strong>Contact:</strong> {item.contactEmail}</p>
          {item.imageUrl && <img src={item.imageUrl} alt="Found item" />}
          
          {item.status === 'returned' && (
            <p style={{color: 'green', fontWeight: 'bold'}}>
              Returned on: {item.returnedDate}
            </p>
          )}
          
          <div style={{marginTop: '15px'}}>
            {item.status !== 'returned' ? (
              <div>
                <Link to="/contact" state={{ finderEmail: item.contactEmail }}>
                  <button className="btn-contact">Contact Finder</button>
                </Link>
                
                <button 
                  className="btn-returned"
                  onClick={() => markReturned(item.id, item.contactEmail)}
                  disabled={updating}
                  style={{marginLeft: '10px'}}
                >
                  {updating ? 'Updating...' : 'Mark as Returned'}
                </button>
              </div>
            ) : (
              <div style={{backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '5px', textAlign: 'center'}}>
                This item has been returned! 🎉
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FoundItemsLists;
