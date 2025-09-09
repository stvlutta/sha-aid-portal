import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database
export type Profile = {
  id: string
  full_name: string
  email: string
  phone?: string
  created_at: string
  updated_at: string
}

export type ApplicationStatus = 'pending' | 'under_review' | 'approved' | 'rejected'
export type ApplicationType = 'health' | 'education'
export type Gender = 'male' | 'female' | 'other'

export type Application = {
  id: string
  user_id: string
  application_type: ApplicationType
  status: ApplicationStatus
  full_name: string
  date_of_birth: string
  gender: Gender
  phone: string
  email: string
  national_id: string
  county: string
  sub_county: string
  division: string
  location: string
  sub_location: string
  village: string
  school_name: string
  school_level: string
  class_year: string
  household_size: number
  monthly_income?: number
  reason_for_application: string
  id_document_url?: string
  school_fees_structure_url?: string
  income_certificate_url?: string
  birth_certificate_url?: string
  reviewed_by?: string
  reviewed_at?: string
  admin_comments?: string
  created_at: string
  updated_at: string
}

export type ContactSubmission = {
  id: string
  name: string
  email: string
  subject: string
  message: string
  created_at: string
}

// Auth helpers
export const signUp = async (email: string, password: string, fullName: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      }
    }
  })
  return { data, error }
}

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  return { data, error }
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  return { error }
}

export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser()
  return { user, error }
}

// Application helpers
export const submitApplication = async (applicationData: Omit<Application, 'id' | 'user_id' | 'status' | 'created_at' | 'updated_at'>) => {
  const { data, error } = await supabase
    .from('applications')
    .insert([applicationData])
    .select()
    .single()
  
  return { data, error }
}

export const getUserApplications = async (userId: string) => {
  const { data, error } = await supabase
    .from('applications')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  
  return { data, error }
}

export const getAllApplications = async (filters?: { 
  school_name?: string
  application_type?: ApplicationType
  status?: ApplicationStatus
}) => {
  let query = supabase
    .from('applications')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (filters?.school_name) {
    query = query.ilike('school_name', `%${filters.school_name}%`)
  }
  
  if (filters?.application_type) {
    query = query.eq('application_type', filters.application_type)
  }
  
  if (filters?.status) {
    query = query.eq('status', filters.status)
  }
  
  const { data, error } = await query
  return { data, error }
}

export const updateApplicationStatus = async (
  applicationId: string, 
  status: ApplicationStatus, 
  adminComments?: string
) => {
  const { data: { user } } = await supabase.auth.getUser()
  
  const { data, error } = await supabase
    .from('applications')
    .update({
      status,
      admin_comments: adminComments,
      reviewed_by: user?.id,
      reviewed_at: new Date().toISOString()
    })
    .eq('id', applicationId)
    .select()
    .single()
  
  return { data, error }
}

// Contact form helper
export const submitContactForm = async (contactData: Omit<ContactSubmission, 'id' | 'created_at'>) => {
  const { data, error } = await supabase
    .from('contact_submissions')
    .insert([contactData])
    .select()
    .single()
  
  return { data, error }
}

// File upload helper
export const uploadDocument = async (file: File, userId: string, documentType: string) => {
  const fileExt = file.name.split('.').pop()
  const fileName = `${userId}/${documentType}-${Date.now()}.${fileExt}`
  
  const { data, error } = await supabase.storage
    .from('application-documents')
    .upload(fileName, file)
  
  if (error) return { data: null, error }
  
  const { data: { publicUrl } } = supabase.storage
    .from('application-documents')
    .getPublicUrl(fileName)
  
  return { data: { path: fileName, url: publicUrl }, error: null }
}

// Check if user is admin
export const checkAdminStatus = async (userId: string) => {
  const { data, error } = await supabase
    .from('admin_users')
    .select('role')
    .eq('user_id', userId)
    .single()
  
  return { isAdmin: !!data && !error, error }
}