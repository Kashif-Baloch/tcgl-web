"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { format } from "date-fns"
import { CalendarIcon, Check, CheckCircle, Download, LogOut, TrendingUp, Users, X, XCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useMemo, useState } from "react"

// Mock data for demonstration
const initialSubmissions = [
    {
        id: 1,
        timestamp: new Date("2024-01-15T10:30:00"),
        firstName: "John",
        lastName: "Smith",
        email: "john.smith@email.com",
        phone: "+44 7700 900123",
        address: "123 High Street, London, SW1A 1AA",
        lender: "Santander",
        status: "approved",
    },
    {
        id: 2,
        timestamp: new Date("2024-01-15T11:45:00"),
        firstName: "Sarah",
        lastName: "Johnson",
        email: "sarah.johnson@email.com",
        phone: "+44 7700 900456",
        address: "456 Oak Avenue, Manchester, M1 1AA",
        lender: "Barclays",
        status: "rejected",
    },
    {
        id: 3,
        timestamp: new Date("2024-01-15T14:20:00"),
        firstName: "Michael",
        lastName: "Brown",
        email: "michael.brown@email.com",
        phone: "+44 7700 900789",
        address: "789 Church Lane, Birmingham, B1 1AA",
        lender: "HSBC",
        status: "pending",
    },
    {
        id: 4,
        timestamp: new Date("2024-01-14T09:15:00"),
        firstName: "Emma",
        lastName: "Davis",
        email: "emma.davis@email.com",
        phone: "+44 7700 900012",
        address: "321 Park Road, Leeds, LS1 1AA",
        lender: "Lloyds",
        status: "approved",
    },
    {
        id: 5,
        timestamp: new Date("2024-01-14T16:30:00"),
        firstName: "James",
        lastName: "Wilson",
        email: "james.wilson@email.com",
        phone: "+44 7700 900345",
        address: "654 Victoria Street, Glasgow, G1 1AA",
        lender: "NatWest",
        status: "rejected",
    },
    {
        id: 6,
        timestamp: new Date("2024-01-13T13:45:00"),
        firstName: "Lisa",
        lastName: "Taylor",
        email: "lisa.taylor@email.com",
        phone: "+44 7700 900678",
        address: "987 Queen Street, Edinburgh, EH1 1AA",
        lender: "Santander",
        status: "approved",
    },
    {
        id: 7,
        timestamp: new Date("2024-01-15T16:00:00"),
        firstName: "David",
        lastName: "Miller",
        email: "david.miller@email.com",
        phone: "+44 7700 900901",
        address: "111 Market Street, Liverpool, L1 1AA",
        lender: "Halifax",
        status: "pending",
    },
    {
        id: 8,
        timestamp: new Date("2024-01-15T17:30:00"),
        firstName: "Sophie",
        lastName: "Anderson",
        email: "sophie.anderson@email.com",
        phone: "+44 7700 900234",
        address: "222 Castle Road, Newcastle, NE1 1AA",
        lender: "Nationwide",
        status: "pending",
    },
]

export default function AdminDashboard() {
    const [submissions, setSubmissions] = useState(initialSubmissions)
    const [filteredSubmissions, setFilteredSubmissions] = useState(initialSubmissions)
    const [currentPage, setCurrentPage] = useState(1)
    const [statusFilter, setStatusFilter] = useState("all")
    const [dateFilter, setDateFilter] = useState<Date | undefined>(undefined)
    const [searchTerm, setSearchTerm] = useState("")
    const [actionLoading, setActionLoading] = useState<number | null>(null)
    const router = useRouter()
    const itemsPerPage = 5

    // Filter submissions based on filters
    useEffect(() => {
        let filtered = submissions

        // Status filter
        if (statusFilter !== "all") {
            filtered = filtered.filter((sub) => sub.status === statusFilter)
        }

        // Date filter
        if (dateFilter) {
            filtered = filtered.filter((sub) => format(sub.timestamp, "yyyy-MM-dd") === format(dateFilter, "yyyy-MM-dd"))
        }

        // Search filter
        if (searchTerm) {
            filtered = filtered.filter(
                (sub) =>
                    sub.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    sub.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    sub.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    sub.phone.includes(searchTerm),
            )
        }

        setFilteredSubmissions(filtered)
        setCurrentPage(1)
    }, [submissions, statusFilter, dateFilter, searchTerm])

    // Calculate stats
    const stats = useMemo(() => {
        const today = new Date()
        const todaySubmissions = submissions.filter(
            (sub) => format(sub.timestamp, "yyyy-MM-dd") === format(today, "yyyy-MM-dd"),
        )

        const totalSubmissions = submissions.length
        const approvedCount = submissions.filter((sub) => sub.status === "approved").length
        const rejectedCount = submissions.filter((sub) => sub.status === "rejected").length
        const successRate = totalSubmissions > 0 ? ((approvedCount / totalSubmissions) * 100).toFixed(1) : "0"

        return {
            leadsToday: todaySubmissions.length,
            successRate: `${successRate}%`,
            totalRejects: rejectedCount,
            totalSubmissions,
        }
    }, [submissions])

    // Pagination
    const totalPages = Math.ceil(filteredSubmissions.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const paginatedSubmissions = filteredSubmissions.slice(startIndex, startIndex + itemsPerPage)

    const handleLogout = async () => {
        // localStorage.removeItem("admin_authenticated")
        // router.push("/")
        try {
            await fetch('/api/admin/logout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            })
            router.push("/login")
        } catch {
            console.log("Error")
        }
    }

    const exportToCSV = () => {
        const headers = ["Timestamp", "First Name", "Last Name", "Email", "Phone", "Address", "Lender", "Status"]
        const csvContent = [
            headers.join(","),
            ...filteredSubmissions.map((sub) =>
                [
                    format(sub.timestamp, "yyyy-MM-dd HH:mm:ss"),
                    sub.firstName,
                    sub.lastName,
                    sub.email,
                    sub.phone,
                    `"${sub.address}"`,
                    sub.lender,
                    sub.status,
                ].join(","),
            ),
        ].join("\n")

        const blob = new Blob([csvContent], { type: "text/csv" })
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `submissions-${format(new Date(), "yyyy-MM-dd")}.csv`
        a.click()
        window.URL.revokeObjectURL(url)
    }

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "approved":
                return (
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Approved
                    </Badge>
                )
            case "rejected":
                return (
                    <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
                        <XCircle className="w-3 h-3 mr-1" />
                        Rejected
                    </Badge>
                )
            case "pending":
                return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>
            default:
                return <Badge variant="secondary">{status}</Badge>
        }
    }

    const handleStatusUpdate = async (submissionId: number, newStatus: "approved" | "rejected" | "pending") => {
        try {
            console.log(`Updating submission ${submissionId} to ${newStatus}`)
            setActionLoading(submissionId)

            // Simulate API call delay
            await new Promise((resolve) => setTimeout(resolve, 1500))

            // Update the submission status
            setSubmissions((prevSubmissions) => {
                const updatedSubmissions = prevSubmissions.map((sub) =>
                    sub.id === submissionId ? { ...sub, status: newStatus } : sub,
                )
                console.log(`Successfully updated submission ${submissionId} to ${newStatus}`)
                return updatedSubmissions
            })

            setActionLoading(null)

            // Show success feedback
            const statusText =
                newStatus === "approved" ? "ACCEPTED" : newStatus === "rejected" ? "REJECTED" : "RESET TO PENDING"
            alert(`✅ Lead ${statusText} successfully!`)
        } catch (error) {
            console.error("Error updating status:", error)
            setActionLoading(null)
            alert("❌ Error updating lead status. Please try again.")
        }
    }
    const handleAccept = (
        submission: any
    ) => {
        const confirmed = window.confirm(
            `🟢 ACCEPT LEAD\n\nAre you sure you want to ACCEPT this lead?\n\nName: ${submission.firstName} ${submission.lastName}\nEmail: ${submission.email}\nPhone: ${submission.phone}\n\nThis action will mark the lead as APPROVED.`,
        )

        if (confirmed) {
            handleStatusUpdate(submission.id, "approved")
        }
    }

    const handleReject = (submission: any) => {
        const confirmed = window.confirm(
            `🔴 REJECT LEAD\n\nAre you sure you want to REJECT this lead?\n\nName: ${submission.firstName} ${submission.lastName}\nEmail: ${submission.email}\nPhone: ${submission.phone}\n\nThis action will mark the lead as REJECTED.`,
        )

        if (confirmed) {
            handleStatusUpdate(submission.id, "rejected")
        }
    }

    const handleReset = (submission: any) => {
        const confirmed = window.confirm(
            `🔄 RESET LEAD\n\nReset this lead back to PENDING status?\n\nName: ${submission.firstName} ${submission.lastName}\nCurrent Status: ${submission.status.toUpperCase()}`,
        )

        if (confirmed) {
            handleStatusUpdate(submission.id, "pending")
        }
    }

    const getActionButtons = (submission: any) => {
        const isLoading = actionLoading === submission.id

        if (submission.status === "pending") {
            return (
                <div className="flex gap-2">
                    <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700 text-white min-w-[80px]"
                        disabled={isLoading}
                        onClick={() => handleAccept(submission)}
                    >
                        {isLoading ? (
                            <span className="flex items-center">
                                <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-1"></div>
                                Wait...
                            </span>
                        ) : (
                            <>
                                <Check className="w-3 h-3 mr-1" />
                                Accept
                            </>
                        )}
                    </Button>

                    <Button
                        size="sm"
                        variant="destructive"
                        disabled={isLoading}
                        onClick={() => handleReject(submission)}
                        className="min-w-[80px]"
                    >
                        {isLoading ? (
                            <span className="flex items-center">
                                <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-1"></div>
                                Wait...
                            </span>
                        ) : (
                            <>
                                <X className="w-3 h-3 mr-1" />
                                Reject
                            </>
                        )}
                    </Button>
                </div>
            )
        } else {
            return (
                <div className="flex gap-2">
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleReset(submission)}
                        disabled={isLoading}
                        className="min-w-[120px]"
                    >
                        {isLoading ? (
                            <span className="flex items-center">
                                <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-gray-600 mr-1"></div>
                                Updating...
                            </span>
                        ) : (
                            "Reset to Pending"
                        )}
                    </Button>
                </div>
            )
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <h1 className="text-2xl font-bold text-[#d73470]">Admin <span className="text-primary">Dashboard</span></h1>
                        <Button onClick={handleLogout} variant="outline">
                            <LogOut className="w-4 h-4 mr-2" />
                            Logout
                        </Button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-2 sm:gap-6 mb-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Leads Today</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.leadsToday}</div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">{stats.successRate}</div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Rejects</CardTitle>
                            <XCircle className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-red-600">{stats.totalRejects}</div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Submissions</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.totalSubmissions}</div>
                        </CardContent>
                    </Card>
                </div>

                {/* Filters and Export */}
                <Card className="mb-2 sm:mb-6">
                    <CardHeader>
                        <CardTitle>Submissions Management</CardTitle>
                        <CardDescription>Manage and filter all form submissions - Accept or Reject pending leads</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col sm:flex-row gap-4 mb-6">
                            <Input
                                placeholder="Search by name, email, or phone..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="sm:max-w-xs"
                            />

                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                                <SelectTrigger className="sm:max-w-xs">
                                    <SelectValue placeholder="Filter by status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Status</SelectItem>
                                    <SelectItem value="approved">Approved</SelectItem>
                                    <SelectItem value="rejected">Rejected</SelectItem>
                                    <SelectItem value="pending">Pending</SelectItem>
                                </SelectContent>
                            </Select>

                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" className="sm:max-w-xs justify-start text-left font-normal">
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {dateFilter ? format(dateFilter, "PPP") : "Filter by date"}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar mode="single" selected={dateFilter} onSelect={setDateFilter} initialFocus />
                                    {dateFilter && (
                                        <div className="p-3 border-t">
                                            <Button variant="outline" size="sm" onClick={() => setDateFilter(undefined)} className="w-full">
                                                Clear Date Filter
                                            </Button>
                                        </div>
                                    )}
                                </PopoverContent>
                            </Popover>

                            <Button onClick={exportToCSV} className="sm:ml-auto">
                                <Download className="w-4 h-4 mr-2" />
                                Export CSV
                            </Button>
                        </div>

                        {/* Table */}
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Timestamp</TableHead>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Phone</TableHead>
                                        <TableHead>Address</TableHead>
                                        <TableHead>Lender</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-center">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {paginatedSubmissions.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                                                No submissions found matching your criteria.
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        paginatedSubmissions.map((submission) => (
                                            <TableRow
                                                key={submission.id}
                                                className={`${actionLoading === submission.id ? "opacity-50 bg-gray-50" : ""} transition-all duration-200`}
                                            >
                                                <TableCell className="font-mono text-sm">
                                                    {format(submission.timestamp, "dd/MM/yyyy HH:mm")}
                                                </TableCell>
                                                <TableCell className="font-medium">
                                                    {submission.firstName} {submission.lastName}
                                                </TableCell>
                                                <TableCell>{submission.email}</TableCell>
                                                <TableCell>{submission.phone}</TableCell>
                                                <TableCell className="max-w-xs truncate" title={submission.address}>
                                                    {submission.address}
                                                </TableCell>
                                                <TableCell>{submission.lender}</TableCell>
                                                <TableCell>{getStatusBadge(submission.status)}</TableCell>
                                                <TableCell className="text-center">{getActionButtons(submission)}</TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex items-center justify-between mt-4">
                                <div className="text-sm text-muted-foreground">
                                    Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredSubmissions.length)} of{" "}
                                    {filteredSubmissions.length} results
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                        disabled={currentPage === 1}
                                    >
                                        Previous
                                    </Button>
                                    <div className="flex items-center space-x-1">
                                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                            <Button
                                                key={page}
                                                variant={currentPage === page ? "default" : "outline"}
                                                size="sm"
                                                onClick={() => setCurrentPage(page)}
                                                className="w-8 h-8 p-0"
                                            >
                                                {page}
                                            </Button>
                                        ))}
                                    </div>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                        disabled={currentPage === totalPages}
                                    >
                                        Next
                                    </Button>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
