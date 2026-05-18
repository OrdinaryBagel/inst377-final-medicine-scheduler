##Deployment
#Step 1: Connect to Supabase
This is done through the prep steps by getting and including your Supabase API keys

#Step 2: Connect to Vercel
This can be done through their website after making an account>
1. Connect your GitHub library to Vercel
2. Make a new project
3. Copy and paste the environment variables(.env file)
4. Deploy the project

#Step 3: Set up the supabase tables
There are 2 required tables.
1. 
## Table `Users`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `int8` | Primary Identity |
| `created_at` | `timestamptz` |  |
| `username` | `varchar` |  |


2. 
## Table `medication`

feature test user

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `int8` | Primary Identity |
| `date_started` | `date` |  |
| `time_taken` | `_timetz` |  |
| `medicine_name` | `varchar` |  |
| `cycle` | `varchar` |  |
| `times_missed` | `_timestamp` |  |
| `servings` | `int4` |  |
| `days_taken_week` | `_varchar` |  Nullable |
| `username` | `varchar` |  |
| `days_taken_month` | `_int4` |  Nullable |
