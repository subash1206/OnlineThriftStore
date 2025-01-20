// storageChunking.ts
export const storageChunking = {
    // Save large data by chunking
    saveData(key: string, data: any): void {
      const stringData = JSON.stringify(data);
      
      try {
        // Try direct save first
        localStorage.setItem(key, stringData);
      } catch (e) {
        // If quota exceeded, clean up old data and try chunking
        this.cleanupOldChunks();
        
        const chunkSize = 500000; // ~500KB chunks
        const chunks = Math.ceil(stringData.length / chunkSize);
        
        // Store chunk info
        localStorage.setItem(`${key}_info`, JSON.stringify({ chunks }));
        
        // Store chunks
        for (let i = 0; i < chunks; i++) {
          const start = i * chunkSize;
          const end = start + chunkSize;
          const chunk = stringData.slice(start, end);
          localStorage.setItem(`${key}_${i}`, chunk);
        }
      }
    },
  
    // Load chunked data
    loadData(key: string): any {
      try {
        // Try direct load first
        const data = localStorage.getItem(key);
        if (data) return JSON.parse(data);
  
        // Check for chunks
        const info = localStorage.getItem(`${key}_info`);
        if (!info) return null;
  
        const { chunks } = JSON.parse(info);
        let fullData = '';
  
        // Combine chunks
        for (let i = 0; i < chunks; i++) {
          const chunk = localStorage.getItem(`${key}_${i}`);
          if (chunk) fullData += chunk;
        }
  
        return JSON.parse(fullData);
      } catch (e) {
        return null;
      }
    },
  
    // Clean up old chunks
    cleanupOldChunks(): void {
      const keys = Object.keys(localStorage);
      const chunkKeys = keys.filter(k => k.includes('_chunk_'));
      const oldKeys = chunkKeys.filter(k => {
        const timestamp = localStorage.getItem(`${k}_timestamp`);
        if (!timestamp) return true;
        const age = Date.now() - parseInt(timestamp);
        return age > 24 * 60 * 60 * 1000; // 24 hours
      });
      oldKeys.forEach(k => localStorage.removeItem(k));
    }
  };