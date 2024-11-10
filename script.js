class DataStructureVisualizer {
    constructor() {
        this.array = [];
        this.linkedList = [];
        this.variables = [];
        this.heapItems = [];
        this.currentDS = 'array';
        this.maxSize = 8;
        this.nextAddress = 0x1000;

        // Event listener for dropdown changes
        document.getElementById('dataStructure').addEventListener('change', (e) => {
            this.currentDS = e.target.value;
            this.clearStructure();
        });
    }

    // Add element to the selected data structure
    addElement(value) {
        if (!value || value.trim() === '') {
            this.showError('Please enter a value');
            return;
        }

        switch (this.currentDS) {
            case 'array':
                if (this.array.length < this.maxSize) {
                    this.array.push(value);
                    this.render();
                } else {
                    this.showError('Array is full');
                }
                break;
            case 'linkedList':
                this.linkedList.push(value); // Simple push for linked list demo
                this.render();
                break;
            case 'pointers':
                if (this.heapItems.length < this.maxSize) {
                    this.heapItems.push(value);
                    this.render();
                } else {
                    this.showError('Heap is full');
                }
                break;
        }
    }

    // Remove last element
    removeElement() {
        switch (this.currentDS) {
            case 'array':
                this.array.pop();
                break;
            case 'linkedList':
                this.linkedList.pop();
                break;
            case 'pointers':
                this.heapItems.pop();
                break;
        }
        this.render();
    }

    // Clear all elements
    clearStructure() {
        this.array = [];
        this.linkedList = [];
        this.heapItems = [];
        this.render();
    }

    // Show error messages
    showError(message) {
        document.getElementById('errorMessage').textContent = message;
    }

    // Render the data structure
    render() {
        // Clear the memory regions
        document.getElementById('stackRegion').innerHTML = '';
        document.getElementById('heapRegion').innerHTML = '';

        // Render based on current data structure
        let regionElement;
        switch (this.currentDS) {
            case 'array':
                regionElement = document.getElementById('stackRegion');
                this.array.forEach((value, index) => {
                    let div = document.createElement('div');
                    div.textContent = `Index ${index}: ${value}`;
                    regionElement.appendChild(div);
                });
                break;
            case 'linkedList':
                regionElement = document.getElementById('stackRegion');
                this.linkedList.forEach((value, index) => {
                    let div = document.createElement('div');
                    div.textContent = `Node ${index}: ${value}`;
                    regionElement.appendChild(div);
                });
                break;
            case 'pointers':
                regionElement = document.getElementById('heapRegion');
                this.heapItems.forEach((value, index) => {
                    let div = document.createElement('div');
                    div.textContent = `Address ${this.nextAddress + index * 0x10}: ${value}`;
                    regionElement.appendChild(div);
                });
                break;
        }
    }
}

// Initialize the visualizer when the page loads
const visualizer = new DataStructureVisualizer();

// Event listeners for buttons
document.querySelector('button[onclick="addElement()"]').addEventListener('click', () => {
    const value = document.getElementById('input').value;
    visualizer.addElement(value);
});

document.querySelector('button[onclick="removeElement()"]').addEventListener('click', () => {
    visualizer.removeElement();
});

document.querySelector('button[onclick="clearStructure()"]').addEventListener('click', () => {
    visualizer.clearStructure();
});

