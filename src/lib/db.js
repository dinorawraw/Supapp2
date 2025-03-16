const db = {
  // Users
  async getUsers() {
    try {
      return JSON.parse(localStorage.getItem('users') || '[]');
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  },

  async getUserByEmail(email) {
    try {
      const users = await this.getUsers();
      return users.find(user => user.email === email) || null;
    } catch (error) {
      console.error('Error fetching user by email:', error);
      return null;
    }
  },

  async createUser(userData) {
    try {
      const users = await this.getUsers();
      const newUser = {
        id: crypto.randomUUID(),
        username: userData.username,
        name: userData.name,
        email: userData.email,
        password: userData.password, // In a real app, this should be hashed
        role: userData.role || 'user',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      return newUser;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },

  async updateUser(id, userData) {
    try {
      const users = await this.getUsers();
      const index = users.findIndex(user => user.id === id);
      if (index === -1) throw new Error('User not found');

      const updatedUser = {
        ...users[index],
        ...userData,
        updated_at: new Date().toISOString()
      };
      users[index] = updatedUser;
      localStorage.setItem('users', JSON.stringify(users));
      return updatedUser;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  },

  async deleteUser(id) {
    try {
      const users = await this.getUsers();
      const filteredUsers = users.filter(user => user.id !== id);
      localStorage.setItem('users', JSON.stringify(filteredUsers));
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  },

  // News
  async getNews() {
    try {
      return JSON.parse(localStorage.getItem('news') || '[]');
    } catch (error) {
      console.error('Error fetching news:', error);
      return [];
    }
  },

  async createNews(newsData) {
    try {
      const news = await this.getNews();
      const newItem = {
        id: crypto.randomUUID(),
        ...newsData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      news.push(newItem);
      localStorage.setItem('news', JSON.stringify(news));
      return newItem;
    } catch (error) {
      console.error('Error creating news:', error);
      throw error;
    }
  },

  async updateNews(id, newsData) {
    try {
      const news = await this.getNews();
      const index = news.findIndex(item => item.id === id);
      if (index === -1) throw new Error('News item not found');

      const updatedItem = {
        ...news[index],
        ...newsData,
        updated_at: new Date().toISOString()
      };
      news[index] = updatedItem;
      localStorage.setItem('news', JSON.stringify(news));
      return updatedItem;
    } catch (error) {
      console.error('Error updating news:', error);
      throw error;
    }
  },

  async deleteNews(id) {
    try {
      const news = await this.getNews();
      const filteredNews = news.filter(item => item.id !== id);
      localStorage.setItem('news', JSON.stringify(filteredNews));
    } catch (error) {
      console.error('Error deleting news:', error);
      throw error;
    }
  },

  // Calculations
  async getCalculations() {
    try {
      return JSON.parse(localStorage.getItem('calculations') || '[]');
    } catch (error) {
      console.error('Error fetching calculations:', error);
      return [];
    }
  },

  async getCalculationsByUser(userId) {
    try {
      const calculations = await this.getCalculations();
      return calculations.filter(calc => calc.user_id === userId);
    } catch (error) {
      console.error('Error fetching user calculations:', error);
      return [];
    }
  },

  async createCalculation(calcData) {
    try {
      const calculations = await this.getCalculations();
      const newCalc = {
        id: crypto.randomUUID(),
        ...calcData,
        created_at: new Date().toISOString()
      };
      calculations.push(newCalc);
      localStorage.setItem('calculations', JSON.stringify(calculations));
      return newCalc;
    } catch (error) {
      console.error('Error creating calculation:', error);
      throw error;
    }
  },

  async deleteCalculation(id) {
    try {
      const calculations = await this.getCalculations();
      const filteredCalcs = calculations.filter(calc => calc.id !== id);
      localStorage.setItem('calculations', JSON.stringify(filteredCalcs));
    } catch (error) {
      console.error('Error deleting calculation:', error);
      throw error;
    }
  },

  // Authentication
  async login(email, password) {
    try {
      const users = await this.getUsers();
      const user = users.find(u => u.email === email && u.password === password);
      if (!user) throw new Error('Invalid credentials');
      return user;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }
};

export default db;