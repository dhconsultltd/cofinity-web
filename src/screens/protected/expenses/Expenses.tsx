import React, { useState } from 'react';
import { 
  Plus,
  Search,
  Eye,
  Edit,
  Trash2,
  Download,
  Calendar,
  FolderOpen,
  Receipt,
  TrendingUp,
  DollarSign
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

// Mock data for expense categories
const mockCategories = [
  {
    id: 1,
    name: 'Office Supplies',
    description: 'Stationery, printing materials, office equipment',
    color: 'blue',
    totalExpenses: 125000,
    expenseCount: 12
  },
  {
    id: 2,
    name: 'Utilities',
    description: 'Electricity, water, internet, phone bills',
    color: 'green',
    totalExpenses: 85000,
    expenseCount: 8
  },
  {
    id: 3,
    name: 'Staff Welfare',
    description: 'Staff training, refreshments, welfare packages',
    color: 'purple',
    totalExpenses: 250000,
    expenseCount: 15
  },
  {
    id: 4,
    name: 'Transportation',
    description: 'Vehicle maintenance, fuel, transportation allowances',
    color: 'orange',
    totalExpenses: 95000,
    expenseCount: 10
  },
  {
    id: 5,
    name: 'Rent & Facilities',
    description: 'Office rent, facility maintenance, security',
    color: 'red',
    totalExpenses: 450000,
    expenseCount: 3
  }
];

// Mock data for expenses
const mockExpenses = [
  {
    id: 1,
    date: '2024-12-10',
    category: 'Office Supplies',
    categoryId: 1,
    description: 'Purchase of printer ink cartridges',
    amount: 25000,
    paymentMethod: 'Cash',
    receiptNumber: 'RCP-2024-001',
    approvedBy: 'John Doe',
    status: 'approved'
  },
  {
    id: 2,
    date: '2024-12-09',
    category: 'Utilities',
    categoryId: 2,
    description: 'Electricity bill - December',
    amount: 35000,
    paymentMethod: 'Bank Transfer',
    receiptNumber: 'RCP-2024-002',
    approvedBy: 'Jane Smith',
    status: 'approved'
  },
  {
    id: 3,
    date: '2024-12-08',
    category: 'Staff Welfare',
    categoryId: 3,
    description: 'Staff training workshop',
    amount: 80000,
    paymentMethod: 'Bank Transfer',
    receiptNumber: 'RCP-2024-003',
    approvedBy: 'John Doe',
    status: 'pending'
  },
  {
    id: 4,
    date: '2024-12-07',
    category: 'Transportation',
    categoryId: 4,
    description: 'Vehicle fuel and maintenance',
    amount: 45000,
    paymentMethod: 'Cash',
    receiptNumber: 'RCP-2024-004',
    approvedBy: 'Jane Smith',
    status: 'approved'
  },
  {
    id: 5,
    date: '2024-12-06',
    category: 'Office Supplies',
    categoryId: 1,
    description: 'Stationery and office materials',
    amount: 15000,
    paymentMethod: 'Cash',
    receiptNumber: 'RCP-2024-005',
    approvedBy: 'John Doe',
    status: 'rejected'
  }
];

// Format currency
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
  }).format(amount);
};

// Format date
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
};

// Status Badge Component
const StatusBadge = ({ status }) => {
  const statusConfig = {
    approved: { label: 'Approved', className: 'bg-green-100 text-green-800 border-green-200' },
    pending: { label: 'Pending', className: 'bg-amber-100 text-amber-800 border-amber-200' },
    rejected: { label: 'Rejected', className: 'bg-red-100 text-red-800 border-red-200' }
  };

  const config = statusConfig[status] || statusConfig.pending;

  return (
    <Badge variant="outline" className={config.className}>
      {config.label}
    </Badge>
  );
};

const ExpensesManagementPage = () => {
  const [expenses, setExpenses] = useState(mockExpenses);
  const [categories, setCategories] = useState(mockCategories);
  const [searchQuery, setSearchQuery] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState('10');
  
  // Dialog states
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [isViewCategoriesOpen, setIsViewCategoriesOpen] = useState(false);
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);

  // Form states
  const [categoryForm, setCategoryForm] = useState({
    name: '',
    description: '',
    color: 'blue'
  });

  const [expenseForm, setExpenseForm] = useState({
    date: new Date().toISOString().split('T')[0],
    categoryId: '',
    description: '',
    amount: '',
    paymentMethod: 'Cash',
    receiptNumber: '',
    approvedBy: '',
    status: 'pending'
  });

  // Calculate statistics
  const stats = {
    totalExpenses: expenses.reduce((sum, exp) => sum + exp.amount, 0),
    approvedExpenses: expenses.filter(e => e.status === 'approved').reduce((sum, exp) => sum + exp.amount, 0),
    pendingExpenses: expenses.filter(e => e.status === 'pending').reduce((sum, exp) => sum + exp.amount, 0),
    categoriesCount: categories.length
  };

  // Filter expenses
  const filteredExpenses = expenses.filter(expense =>
    expense.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    expense.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    expense.receiptNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle category save
  const handleCategorySave = () => {
    if (!categoryForm.name) {
      alert('Please enter category name');
      return;
    }

    const newCategory = {
      id: categories.length + 1,
      name: categoryForm.name,
      description: categoryForm.description,
      color: categoryForm.color,
      totalExpenses: 0,
      expenseCount: 0
    };

    setCategories(prev => [...prev, newCategory]);
    setIsAddCategoryOpen(false);
    setCategoryForm({ name: '', description: '', color: 'blue' });
  };

  // Handle expense save
  const handleExpenseSave = () => {
    if (!expenseForm.categoryId || !expenseForm.description || !expenseForm.amount) {
      alert('Please fill in all required fields');
      return;
    }

    const selectedCategory = categories.find(c => c.id === parseInt(expenseForm.categoryId));

    const newExpense = {
      id: expenses.length + 1,
      date: expenseForm.date,
      category: selectedCategory.name,
      categoryId: selectedCategory.id,
      description: expenseForm.description,
      amount: parseFloat(expenseForm.amount),
      paymentMethod: expenseForm.paymentMethod,
      receiptNumber: expenseForm.receiptNumber,
      approvedBy: expenseForm.approvedBy,
      status: expenseForm.status
    };

    setExpenses(prev => [newExpense, ...prev]);
    setIsAddExpenseOpen(false);
    
    // Reset
    setExpenseForm({
      date: new Date().toISOString().split('T')[0],
      categoryId: '',
      description: '',
      amount: '',
      paymentMethod: 'Cash',
      receiptNumber: '',
      approvedBy: '',
      status: 'pending'
    });
  };

  const handleDeleteExpense = (id) => {
    if (confirm('Are you sure you want to delete this expense?')) {
      setExpenses(prev => prev.filter(e => e.id !== id));
    }
  };

  const handleDeleteCategory = (id) => {
    if (confirm('Are you sure you want to delete this category?')) {
      setCategories(prev => prev.filter(c => c.id !== id));
    }
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Expenses Management</h1>
          <p className="text-gray-600 mt-1">
            Track and manage all cooperative expenses and categories
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>

          {/* View Categories Button */}
          <Dialog open={isViewCategoriesOpen} onOpenChange={setIsViewCategoriesOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-2">
                <FolderOpen className="w-4 h-4" />
                View Categories
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Expense Categories</DialogTitle>
                <DialogDescription>
                  Manage your expense categories and view statistics
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 mt-4">
                {categories.map(category => (
                  <Card key={category.id} className={`border-l-4 border-l-${category.color}-500`}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{category.name}</h3>
                          <p className="text-sm text-gray-600 mt-1">{category.description}</p>
                          <div className="flex gap-4 mt-3">
                            <div className="text-sm">
                              <span className="text-gray-500">Total Expenses:</span>
                              <span className="font-semibold ml-2">{formatCurrency(category.totalExpenses)}</span>
                            </div>
                            <div className="text-sm">
                              <span className="text-gray-500">Count:</span>
                              <span className="font-semibold ml-2">{category.expenseCount}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                            onClick={() => handleDeleteCategory(category.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </DialogContent>
          </Dialog>

          {/* Add Category Button */}
          <Dialog open={isAddCategoryOpen} onOpenChange={setIsAddCategoryOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-2">
                <FolderOpen className="w-4 h-4" />
                Add Category
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Expense Category</DialogTitle>
                <DialogDescription>
                  Create a new category to organize your expenses
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="categoryName">
                    Category Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="categoryName"
                    placeholder="e.g., Office Supplies"
                    value={categoryForm.name}
                    onChange={(e) => setCategoryForm(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="categoryDescription">Description</Label>
                  <Textarea
                    id="categoryDescription"
                    placeholder="Brief description of this category..."
                    value={categoryForm.description}
                    onChange={(e) => setCategoryForm(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="categoryColor">Category Color</Label>
                  <Select 
                    value={categoryForm.color} 
                    onValueChange={(value) => setCategoryForm(prev => ({ ...prev, color: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="blue">Blue</SelectItem>
                      <SelectItem value="green">Green</SelectItem>
                      <SelectItem value="purple">Purple</SelectItem>
                      <SelectItem value="orange">Orange</SelectItem>
                      <SelectItem value="red">Red</SelectItem>
                      <SelectItem value="pink">Pink</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-end gap-2 pt-4 border-t">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsAddCategoryOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="button"
                    onClick={handleCategorySave}
                    className="bg-black hover:bg-gray-800"
                  >
                    Save Category
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* Add Expense Button */}
          <Dialog open={isAddExpenseOpen} onOpenChange={setIsAddExpenseOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2 bg-black hover:bg-gray-800">
                <Plus className="w-4 h-4" />
                Add Expense
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Expense</DialogTitle>
                <DialogDescription>
                  Record a new expense transaction. Fill in all required fields marked with *.
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Date */}
                  <div className="space-y-2">
                    <Label htmlFor="expenseDate">
                      Date <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="expenseDate"
                      type="date"
                      value={expenseForm.date}
                      onChange={(e) => setExpenseForm(prev => ({ ...prev, date: e.target.value }))}
                    />
                  </div>

                  {/* Category */}
                  <div className="space-y-2">
                    <Label htmlFor="expenseCategory">
                      Category <span className="text-red-500">*</span>
                    </Label>
                    <Select 
                      value={expenseForm.categoryId} 
                      onValueChange={(value) => setExpenseForm(prev => ({ ...prev, categoryId: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(cat => (
                          <SelectItem key={cat.id} value={cat.id.toString()}>
                            {cat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Amount */}
                  <div className="space-y-2">
                    <Label htmlFor="expenseAmount">
                      Amount <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="expenseAmount"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={expenseForm.amount}
                      onChange={(e) => setExpenseForm(prev => ({ ...prev, amount: e.target.value }))}
                    />
                  </div>

                  {/* Payment Method */}
                  <div className="space-y-2">
                    <Label htmlFor="paymentMethod">
                      Payment Method <span className="text-red-500">*</span>
                    </Label>
                    <Select 
                      value={expenseForm.paymentMethod} 
                      onValueChange={(value) => setExpenseForm(prev => ({ ...prev, paymentMethod: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Cash">Cash</SelectItem>
                        <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                        <SelectItem value="Cheque">Cheque</SelectItem>
                        <SelectItem value="Mobile Money">Mobile Money</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Receipt Number */}
                  <div className="space-y-2">
                    <Label htmlFor="receiptNumber">Receipt Number</Label>
                    <Input
                      id="receiptNumber"
                      placeholder="RCP-2024-XXX"
                      value={expenseForm.receiptNumber}
                      onChange={(e) => setExpenseForm(prev => ({ ...prev, receiptNumber: e.target.value }))}
                    />
                  </div>

                  {/* Approved By */}
                  <div className="space-y-2">
                    <Label htmlFor="approvedBy">Approved By</Label>
                    <Input
                      id="approvedBy"
                      placeholder="Name of approver"
                      value={expenseForm.approvedBy}
                      onChange={(e) => setExpenseForm(prev => ({ ...prev, approvedBy: e.target.value }))}
                    />
                  </div>

                  {/* Status */}
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="expenseStatus">Status</Label>
                    <Select 
                      value={expenseForm.status} 
                      onValueChange={(value) => setExpenseForm(prev => ({ ...prev, status: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="approved">Approved</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Description - Full width */}
                <div className="space-y-2">
                  <Label htmlFor="expenseDescription">
                    Description <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="expenseDescription"
                    placeholder="Enter expense details..."
                    value={expenseForm.description}
                    onChange={(e) => setExpenseForm(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                  />
                </div>

                <div className="flex justify-end gap-2 pt-4 border-t">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsAddExpenseOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="button"
                    onClick={handleExpenseSave}
                    className="bg-black hover:bg-gray-800"
                  >
                    Save Expense
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-black">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-1">
              <DollarSign className="w-4 h-4" />
              Total Expenses
            </CardDescription>
            <CardTitle className="text-2xl">{formatCurrency(stats.totalExpenses)}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              All time expenses
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              Approved
            </CardDescription>
            <CardTitle className="text-2xl text-green-600">{formatCurrency(stats.approvedExpenses)}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Approved expenses
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-amber-500">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-1">
              <Receipt className="w-4 h-4" />
              Pending
            </CardDescription>
            <CardTitle className="text-2xl text-amber-600">{formatCurrency(stats.pendingExpenses)}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Awaiting approval
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-1">
              <FolderOpen className="w-4 h-4" />
              Categories
            </CardDescription>
            <CardTitle className="text-2xl text-purple-600">{stats.categoriesCount}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Active categories
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Expenses Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
            <CardTitle>All Expenses</CardTitle>
            <div className="flex gap-2 items-center">
              <span className="text-sm text-gray-700">Show</span>
              <Select value={entriesPerPage} onValueChange={setEntriesPerPage}>
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="25">25</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-sm text-gray-700">entries</span>
            </div>
          </div>
          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search expenses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardHeader>

        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold">Date</TableHead>
                  <TableHead className="font-semibold">Category</TableHead>
                  <TableHead className="font-semibold">Description</TableHead>
                  <TableHead className="font-semibold text-right">Amount</TableHead>
                  <TableHead className="font-semibold">Payment Method</TableHead>
                  <TableHead className="font-semibold">Receipt #</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold text-center">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredExpenses.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                      No expenses found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredExpenses.map((expense) => (
                    <TableRow key={expense.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          {formatDate(expense.date)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="font-medium">
                          {expense.category}
                        </Badge>
                      </TableCell>
                      <TableCell className="max-w-xs">
                        <p className="truncate">{expense.description}</p>
                      </TableCell>
                      <TableCell className="text-right font-semibold">
                        {formatCurrency(expense.amount)}
                      </TableCell>
                      <TableCell>{expense.paymentMethod}</TableCell>
                      <TableCell className="font-mono text-sm">
                        {expense.receiptNumber || '—'}
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={expense.status} />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteExpense(expense.id)}
                            className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination info */}
          {filteredExpenses.length > 0 && (
            <div className="mt-4 text-sm text-gray-600">
              Showing {filteredExpenses.length} of {expenses.length} expenses
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ExpensesManagementPage;