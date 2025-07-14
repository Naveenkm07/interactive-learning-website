import React, { useState, useRef, useEffect, useCallback } from 'react';

const initialNodes = [
  { id: '1', type: 'input', position: { x: 50, y: 50 }, data: { label: 'Start' } },
  { id: '2', type: 'processor', position: { x: 200, y: 50 }, data: { label: 'Data Preprocessing', config: { method: 'Normalization' } } },
  { id: '3', type: 'processor', position: { x: 400, y: 50 }, data: { label: 'Feature Engineering', config: { features: 'PCA' } } },
  { id: '4', type: 'model', position: { x: 600, y: 50 }, data: { label: 'ML Model (Predict)', config: { algorithm: 'Random Forest' } } },
  { id: '5', type: 'output', position: { x: 800, y: 50 }, data: { label: 'Result', config: { output_format: 'JSON' } } },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e2-3', source: '2', target: '3' },
  { id: 'e3-4', source: '3', target: '4' },
  { id: 'e4-5', source: '4', target: '5' },
];

const nodeTypes = [
  { id: 'input', label: 'Input', icon: 'fas fa-database', description: 'Data input source' },
  { id: 'processor', label: 'Processor', icon: 'fas fa-cogs', description: 'Data processing step' },
  { id: 'model', label: 'ML Model', icon: 'fas fa-brain', description: 'Machine learning model' },
  { id: 'output', label: 'Output', icon: 'fas fa-file-export', description: 'Final output destination' },
  { id: 'condition', label: 'Condition', icon: 'fas fa-question-circle', description: 'Conditional logic' },
];

const AIFlowBuilderSection = () => {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null);
  const [flowName, setFlowName] = useState('My First AI Flow');
  const [flowStatus, setFlowStatus] = useState('idle'); // idle, running, success, error
  const flowBuilderRef = useRef(null);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback((event) => {
    event.preventDefault();
    const type = event.dataTransfer.getData('application/reactflow');
    const newId = (nodes.length + 1).toString();
    const position = { x: event.clientX - flowBuilderRef.current.getBoundingClientRect().left, y: event.clientY - flowBuilderRef.current.getBoundingClientRect().top };
    const newNode = {
      id: newId,
      type,
      position,
      data: { label: `${type.charAt(0).toUpperCase() + type.slice(1)} Node`, config: {} },
    };
    setNodes((nds) => nds.concat(newNode));
  }, [nodes]);

  const onNodeClick = (nodeId) => {
    const node = nodes.find(n => n.id === nodeId);
    setSelectedNode(node);
  };

  const onNodeChange = (nodeId, newPosition) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === nodeId ? { ...node, position: newPosition } : node
      )
    );
  };

  const onEdgeClick = (edgeId) => {
    setEdges((eds) => eds.filter((edge) => edge.id !== edgeId));
  };

  const addEdge = (source, target) => {
    const newEdge = { id: `e${source}-${target}`, source, target };
    setEdges((eds) => eds.concat(newEdge));
  };

  const updateNodeConfig = (key, value) => {
    if (selectedNode) {
      setNodes((nds) =>
        nds.map((node) =>
          node.id === selectedNode.id
            ? { ...node, data: { ...node.data, config: { ...node.data.config, [key]: value } } }
            : node
        )
      );
      setSelectedNode((prev) => ({ ...prev, data: { ...prev.data, config: { ...prev.data.config, [key]: value } } }));
    }
  };

  const deleteNode = (nodeIdToDelete) => {
    setNodes((nds) => nds.filter(node => node.id !== nodeIdToDelete));
    setEdges((eds) => eds.filter(edge => edge.source !== nodeIdToDelete && edge.target !== nodeIdToDelete));
    if (selectedNode && selectedNode.id === nodeIdToDelete) {
      setSelectedNode(null);
    }
  };

  const handleRunFlow = () => {
    setFlowStatus('running');
    // Simulate flow execution
    setTimeout(() => {
      const randomOutcome = Math.random();
      if (randomOutcome < 0.8) { // 80% success rate
        setFlowStatus('success');
      } else {
        setFlowStatus('error');
      }
      setTimeout(() => setFlowStatus('idle'), 3000); // Reset status after 3 seconds
    }, 2000); // Simulate 2 seconds of running
  };

  return (
    <section className="content-section card" id="aiFlowBuilderSection">
      <div className="card__body ai-flow-builder-container">
        <div className="flow-builder-header">
          <h1>AI Flow Builder</h1>
          <p>Visually design, configure, and simulate your AI and data processing workflows.</p>
        </div>

        <div className="flow-builder-main">
          <div className="flow-sidebar">
            <h3>Node Types</h3>
            <div className="node-types-list">
              {nodeTypes.map((type) => (
                <div
                  key={type.id}
                  className="node-type-item"
                  draggable
                  onDragStart={(event) => {
                    event.dataTransfer.setData('application/reactflow', type.id);
                    event.dataTransfer.effectAllowed = 'move';
                  }}
                >
                  <i className={type.icon}></i>
                  <span>{type.label}</span>
                  <p>{type.description}</p>
                </div>
              ))}
            </div>

            <h3>Flow Settings</h3>
            <div className="flow-settings">
              <div className="form-group">
                <label htmlFor="flow-name">Flow Name:</label>
                <input
                  type="text"
                  id="flow-name"
                  className="form-control"
                  value={flowName}
                  onChange={(e) => setFlowName(e.target.value)}
                />
              </div>
              <button
                className={`btn btn--primary ${flowStatus === 'running' ? 'running' : ''}`}
                onClick={handleRunFlow}
                disabled={flowStatus === 'running'}
              >
                {flowStatus === 'idle' && <><i className="fas fa-play-circle"></i> Run Flow</>}
                {flowStatus === 'running' && <><i className="fas fa-spinner fa-spin"></i> Running...</>}
                {flowStatus === 'success' && <><i className="fas fa-check-circle"></i> Succeeded!</>}
                {flowStatus === 'error' && <><i className="fas fa-exclamation-circle"></i> Failed!</>}
              </button>
              {flowStatus === 'success' && <p className="flow-status-message success">Flow executed successfully!</p>}
              {flowStatus === 'error' && <p className="flow-status-message error">Flow execution failed. Check configurations.</p>}
            </div>
          </div>

          <div className="flow-editor-area" ref={flowBuilderRef} onDrop={onDrop} onDragOver={onDragOver}>
            {nodes.map((node) => (
              <div
                key={node.id}
                className={`flow-node ${node.type} ${selectedNode?.id === node.id ? 'selected' : ''}`}
                style={{ left: node.position.x, top: node.position.y }}
                onClick={() => onNodeClick(node.id)}
                draggable
                onDragEnd={(e) => onNodeChange(node.id, { x: e.clientX - flowBuilderRef.current.getBoundingClientRect().left, y: e.clientY - flowBuilderRef.current.getBoundingClientRect().top })}
              >
                <i className={nodeTypes.find(t => t.id === node.type)?.icon || 'fas fa-circle'}></i>
                <span>{node.data.label}</span>
                <button className="delete-node-btn" onClick={(e) => { e.stopPropagation(); deleteNode(node.id); }}><i className="fas fa-times"></i></button>
              </div>
            ))}
            {edges.map((edge) => {
              const sourceNode = nodes.find(n => n.id === edge.source);
              const targetNode = nodes.find(n => n.id === edge.target);
              if (!sourceNode || !targetNode) return null;

              const startX = sourceNode.position.x + 50; // Center of node
              const startY = sourceNode.position.y + 25;
              const endX = targetNode.position.x + 50;
              const endY = targetNode.position.y + 25;

              return (
                <svg key={edge.id} className="flow-edge" style={{ overflow: 'visible', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                  <defs>
                    <marker id="arrowhead" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--color-text-secondary)" stroke="var(--color-text-secondary)" />
                    </marker>
                  </defs>
                  <line
                    x1={startX}
                    y1={startY}
                    x2={endX}
                    y2={endY}
                    stroke="var(--color-text-secondary)"
                    strokeWidth="2"
                    markerEnd="url(#arrowhead)"
                    onClick={() => onEdgeClick(edge.id)}
                    style={{ cursor: 'pointer' }}
                  />
                </svg>
              );
            })}
            {selectedNode && ( /* Mini-map functionality for connecting nodes */
              <div className="connection-points">
                {nodes.filter(n => n.id !== selectedNode.id).map(node => (
                  <div
                    key={node.id}
                    className="connection-target"
                    style={{ left: node.position.x + 50, top: node.position.y + 25 }}
                    onClick={() => addEdge(selectedNode.id, node.id)}
                  >
                    <i className="fas fa-plus-circle"></i>
                  </div>
                ))}
              </div>
            )}
            {nodes.length === 0 && edges.length === 0 && flowStatus === 'idle' && (
              <div className="empty-flow-message">
                <i className="fas fa-shapes"></i>
                <h3>Start Building Your Flow</h3>
                <p>Drag and drop node types from the sidebar to begin designing your AI workflow.</p>
              </div>
            )}
          </div>

          <div className="node-config-panel">
            <h3>Node Configuration</h3>
            {selectedNode ? (
              <div className="selected-node-details">
                <h4>ID: {selectedNode.id}</h4>
                <h4>Type: {selectedNode.type.charAt(0).toUpperCase() + selectedNode.type.slice(1)}</h4>
                <div className="form-group">
                  <label htmlFor="node-label">Label:</label>
                  <input
                    type="text"
                    id="node-label"
                    className="form-control"
                    value={selectedNode.data.label}
                    onChange={(e) => setNodes(nds => nds.map(n => n.id === selectedNode.id ? { ...n, data: { ...n.data, label: e.target.value } } : n))}
                  />
                </div>
                {Object.entries(selectedNode.data.config).length > 0 && (
                  <div>
                    <h4>Configuration:</h4>
                    {Object.entries(selectedNode.data.config).map(([key, value]) => (
                      <div className="form-group" key={key}>
                        <label htmlFor={`config-${key}`}>{key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}:</label>
                        <input
                          type="text"
                          id={`config-${key}`}
                          className="form-control"
                          value={value}
                          onChange={(e) => updateNodeConfig(key, e.target.value)}
                        />
                      </div>
                    ))}
                  </div>
                )}
                <button className="btn btn--error delete-node-btn-panel" onClick={() => deleteNode(selectedNode.id)}>
                  <i className="fas fa-trash"></i> Delete Node
                </button>
              </div>
            ) : (
              <div className="no-node-selected">
                <i className="fas fa-hand-pointer"></i>
                <p>Select a node in the flow editor to configure its properties.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIFlowBuilderSection; 