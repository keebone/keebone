import React, { useState } from 'react';
import Icons from '../../utils/moduels/icons'; // 使用 @common 别名
import ConfirmBox from './ConfirmBox'; // 使用 @common 别名

function FileItem({item, onUpdate}) {


	const [showConfirmBox, setShowConfirmBox] = useState(false);
	const [confirmdeleteornot, setSelectedId] = useState(null);
  
	const handleIconClick = (id) => {
	  setSelectedId(id);
	  setShowConfirmBox(true);
	};
  
	const handleCloseConfirmBox = () => {
	  setShowConfirmBox(false);
	  setSelectedId(null);
	};

	if (!item) {
		return <aside className='menu'>Select an element to see details</aside>;
	}

		console.log(item)


	return (
	  <div className="fileitem">
		<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 0 1rem 0' }}>
		  <span style={{ color: 'gray', paddingLeft: '1rem', fontSize: '10px' }}> / {item.uuid} </span>
		  {showConfirmBox && ( <ConfirmBox id={confirmdeleteornot} onClose={handleCloseConfirmBox} item={item} onUpdate={onUpdate}/>)} <div onClick={() => handleIconClick('uuid')}> 
          <span className='ireverse'><Icons name="close" /></span>
		  </div>
		</div>
		<a href={`canvas/${item.id}`}>
		<div style={{ borderTop: '1px solid rgba(0,0,0,.1)', paddingTop: '1rem' }}>
		  <div style={{ textAlign: 'right', fontSize: '16px', fontWeight: 'bolder' }}>{item.id} / {item.name}</div>
		  <div style={{ textAlign: 'right', fontSize: '12px', padding:'8px 0', display: 'flex',justifyContent:'right', alignItems: 'center' }}> width X height<span className='ireverse imini'><Icons name='size'/></span></div>
		  {/* <div style={{ textAlign: 'right', color: 'gray', fontSize: '12px' }}>{item.created}</div> */}
		</div>
		</a>
	  </div>
	);
  }
  
export default FileItem;