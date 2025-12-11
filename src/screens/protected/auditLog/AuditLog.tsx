import React, { useState } from 'react';
import { 
  Search,
  Eye,
  Filter,
  Calendar,
  User,
  Activity,
  Download,
  RefreshCw
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
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';

// Mock data for audit logs
const mockAuditLogs = [
  {
    id: 1,
    timestamp: '2024-12-10 14:35:22',
    user: 'John Doe',
    userId: 'USR-001',
    action: 'created',
    model: 'Member',
    modelId: 'MEM-2024-045',
    description: 'Created new member account',
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    oldValues: null,
    newValues: {
      name: 'Chidi Okonkwo',
      email: 'chidi@example.com',
      phone: '08012345678',
      status: 'active'
    }
  },
  {
    id: 2,
    timestamp: '2024-12-10 13:20:15',
    user: 'Jane Smith',
    userId: 'USR-002',
    action: 'updated',
    model: 'Loan',
    modelId: 'LN-2024-001',
    description: 'Updated loan status to approved',
    ipAddress: '192.168.1.105',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
    oldValues: {
      status: 'pending',
      approved_by: null,
      approved_at: null
    },
    newValues: {
      status: 'approved',
      approved_by: 'Jane Smith',
      approved_at: '2024-12-10 13:20:15'
    }
  },
  {
    id: 3,
    timestamp: '2024-12-10 12:45:30',
    user: 'Admin User',
    userId: 'USR-003',
    action: 'deleted',
    model: 'Expense',
    modelId: 'EXP-2024-012',
    description: 'Deleted expense record',
    ipAddress: '192.168.1.102',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    oldValues: {
      amount: 25000,
      category: 'Office Supplies',
      description: 'Duplicate entry'
    },
    newValues: null
  },
  {
    id: 4,
    timestamp: '2024-12-10 11:30:45',
    user: 'John Doe',
    userId: 'USR-001',
    action: 'created',
    model: 'LoanRepayment',
    modelId: 'REP-2024-089',
    description: 'Recorded loan repayment',
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    oldValues: null,
    newValues: {
      loan_id: 'LN-2024-001',
      amount: 30000,
      payment_date: '2024-12-10',
      payment_method: 'Bank Transfer'
    }
  },
  {
    id: 5,
    timestamp: '2024-12-10 10:15:12',
    user: 'Jane Smith',
    userId: 'USR-002',
    action: 'updated',
    model: 'Member',
    modelId: 'MEM-2024-023',
    description: 'Updated member contact information',
    ipAddress: '192.168.1.105',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
    oldValues: {
      phone: '08011111111',
      email: 'old@example.com'
    },
    newValues: {
      phone: '08099999999',
      email: 'new@example.com'
    }
  },
  {
    id: 6,
    timestamp: '2024-12-10 09:20:33',
    user: 'Admin User',
    userId: 'USR-003',
    action: 'created',
    model: 'Expense',
    modelId: 'EXP-2024-013',
    description: 'Added new expense',
    ipAddress: '192.168.1.102',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    oldValues: null,
    newValues: {
      category: 'Utilities',
      amount: 35000,
      description: 'Electricity bill - December',
      payment_method: 'Bank Transfer'
    }
  },
  {
    id: 7,
    timestamp: '2024-12-09 16:45:20',
    user: 'John Doe',
    userId: 'USR-001',
    action: 'updated',
    model: 'Loan',
    modelId: 'LN-2024-005',
    description: 'Updated loan repayment schedule',
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    oldValues: {
      repayment_date: '2024-12-15',
      amount: 25000
    },
    newValues: {
      repayment_date: '2024-12-20',
      amount: 28000
    }
  }
];

// Format date and time
const formatDateTime = (dateString) => {
  return new Date(dateString).toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
};

// Action Badge Component
const ActionBadge = ({ action }) => {
  const actionConfig = {
    created: { label: 'Created', className: 'bg-green-100 text-green-800 border-green-200' },
    updated: { label: 'Updated', className: 'bg-blue-100 text-blue-800 border-blue-200' },
    deleted: { label: 'Deleted', className: 'bg-red-100 text-red-800 border-red-200' }
  };

  const config = actionConfig[action] || actionConfig.created;

  return (
    <Badge variant="outline" className={config.className}>
      {config.label}
    </Badge>
  );
};

// Model Badge Component
const ModelBadge = ({ model }) => {
  const colorMap = {
    Member: 'bg-purple-100 text-purple-800 border-purple-200',
    Loan: 'bg-blue-100 text-blue-800 border-blue-200',
    LoanRepayment: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    Expense: 'bg-orange-100 text-orange-800 border-orange-200',
    ExpenseCategory: 'bg-amber-100 text-amber-800 border-amber-200',
    User: 'bg-gray-100 text-gray-800 border-gray-200'
  };

  return (
    <Badge variant="outline" className={colorMap[model] || 'bg-gray-100 text-gray-800'}>
      {model}
    </Badge>
  );
};

const AuditLogPage = () => {
  const [auditLogs, setAuditLogs] = useState(mockAuditLogs);
  const [searchQuery, setSearchQuery] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState('10');
  const [actionFilter, setActionFilter] = useState('all');
  const [modelFilter, setModelFilter] = useState('all');
  const [selectedLog, setSelectedLog] = useState(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  // Calculate statistics
  const stats = {
    totalLogs: auditLogs.length,
    created: auditLogs.filter(log => log.action === 'created').length,
    updated: auditLogs.filter(log => log.action === 'updated').length,
    deleted: auditLogs.filter(log => log.action === 'deleted').length
  };

  // Filter audit logs
  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = 
      log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.modelId.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesAction = actionFilter === 'all' || log.action === actionFilter;
    const matchesModel = modelFilter === 'all' || log.model === modelFilter;
    
    return matchesSearch && matchesAction && matchesModel;
  });

  // Get unique models
  const uniqueModels = [...new Set(auditLogs.map(log => log.model))];

  const handleViewDetails = (log) => {
    setSelectedLog(log);
    setIsViewDialogOpen(true);
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Audit Log</h1>
          <p className="text-gray-600 mt-1">
            Track all system activities and user actions
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <RefreshCw className="w-4 h-4" />
            Refresh
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-black">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-1">
              <Activity className="w-4 h-4" />
              Total Activities
            </CardDescription>
            <CardTitle className="text-2xl">{stats.totalLogs}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">All logged activities</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-1">
              Created Actions
            </CardDescription>
            <CardTitle className="text-2xl text-green-600">{stats.created}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">New records created</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-1">
              Updated Actions
            </CardDescription>
            <CardTitle className="text-2xl text-blue-600">{stats.updated}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">Records modified</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-500">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-1">
              Deleted Actions
            </CardDescription>
            <CardTitle className="text-2xl text-red-600">{stats.deleted}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">Records deleted</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Audit Log Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
              <CardTitle>Activity Log</CardTitle>
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

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search logs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={actionFilter} onValueChange={setActionFilter}>
                <SelectTrigger>
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter by action" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Actions</SelectItem>
                  <SelectItem value="created">Created</SelectItem>
                  <SelectItem value="updated">Updated</SelectItem>
                  <SelectItem value="deleted">Deleted</SelectItem>
                </SelectContent>
              </Select>

              <Select value={modelFilter} onValueChange={setModelFilter}>
                <SelectTrigger>
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter by model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Models</SelectItem>
                  {uniqueModels.map(model => (
                    <SelectItem key={model} value={model}>{model}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold">Timestamp</TableHead>
                  <TableHead className="font-semibold">User</TableHead>
                  <TableHead className="font-semibold">Action</TableHead>
                  <TableHead className="font-semibold">Model</TableHead>
                  <TableHead className="font-semibold">Model ID</TableHead>
                  <TableHead className="font-semibold">Description</TableHead>
                  <TableHead className="font-semibold">IP Address</TableHead>
                  <TableHead className="font-semibold text-center">Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                      No audit logs found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-sm">{formatDateTime(log.timestamp)}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-gray-400" />
                          <div>
                            <div className="font-medium">{log.user}</div>
                            <div className="text-xs text-gray-500">{log.userId}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <ActionBadge action={log.action} />
                      </TableCell>
                      <TableCell>
                        <ModelBadge model={log.model} />
                      </TableCell>
                      <TableCell className="font-mono text-sm">
                        {log.modelId}
                      </TableCell>
                      <TableCell className="max-w-xs">
                        <p className="truncate">{log.description}</p>
                      </TableCell>
                      <TableCell className="font-mono text-sm text-gray-600">
                        {log.ipAddress}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-center">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => handleViewDetails(log)}
                          >
                            <Eye className="w-4 h-4" />
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
          {filteredLogs.length > 0 && (
            <div className="mt-4 text-sm text-gray-600">
              Showing {filteredLogs.length} of {auditLogs.length} logs
            </div>
          )}
        </CardContent>
      </Card>

      {/* View Details Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Audit Log Details</DialogTitle>
            <DialogDescription>
              Complete information about this activity
            </DialogDescription>
          </DialogHeader>
          
          {selectedLog && (
            <div className="space-y-6 mt-4">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-gray-600">Timestamp</Label>
                  <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-md">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="font-medium">{formatDateTime(selectedLog.timestamp)}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-600">User</Label>
                  <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-md">
                    <User className="w-4 h-4 text-gray-400" />
                    <div>
                      <div className="font-medium">{selectedLog.user}</div>
                      <div className="text-xs text-gray-500">{selectedLog.userId}</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-600">Action</Label>
                  <div className="p-3 bg-gray-50 rounded-md">
                    <ActionBadge action={selectedLog.action} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-600">Model</Label>
                  <div className="p-3 bg-gray-50 rounded-md">
                    <ModelBadge model={selectedLog.model} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-600">Model ID</Label>
                  <div className="p-3 bg-gray-50 rounded-md font-mono text-sm">
                    {selectedLog.modelId}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-600">IP Address</Label>
                  <div className="p-3 bg-gray-50 rounded-md font-mono text-sm">
                    {selectedLog.ipAddress}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label className="text-gray-600">Description</Label>
                <div className="p-3 bg-gray-50 rounded-md">
                  {selectedLog.description}
                </div>
              </div>

              {/* User Agent */}
              <div className="space-y-2">
                <Label className="text-gray-600">User Agent</Label>
                <div className="p-3 bg-gray-50 rounded-md text-sm text-gray-700 break-all">
                  {selectedLog.userAgent}
                </div>
              </div>

              {/* Old Values */}
              {selectedLog.oldValues && (
                <div className="space-y-2">
                  <Label className="text-gray-600">Old Values</Label>
                  <div className="p-4 bg-red-50 rounded-md border border-red-200">
                    <pre className="text-sm text-gray-800 overflow-x-auto">
                      {JSON.stringify(selectedLog.oldValues, null, 2)}
                    </pre>
                  </div>
                </div>
              )}

              {/* New Values */}
              {selectedLog.newValues && (
                <div className="space-y-2">
                  <Label className="text-gray-600">New Values</Label>
                  <div className="p-4 bg-green-50 rounded-md border border-green-200">
                    <pre className="text-sm text-gray-800 overflow-x-auto">
                      {JSON.stringify(selectedLog.newValues, null, 2)}
                    </pre>
                  </div>
                </div>
              )}

              <div className="flex justify-end pt-4 border-t">
                <Button 
                  variant="outline" 
                  onClick={() => setIsViewDialogOpen(false)}
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AuditLogPage;