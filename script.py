from faker import Faker
import random
import csv
from datetime import datetime, timedelta

fake = Faker()

# Generate random data for Customers
def generate_customers(num):
    customers = []
    for _ in range(num):
        customer_id = _
        name = fake.name()
        email = fake.email()
        phone = fake.phone_number()
        address = fake.address()
        created_at = fake.date_time_this_decade(before_now=True, after_now=False, tzinfo=None)
        customers.append([customer_id, name, email, phone, address, created_at])
    return customers

# Generate random data for Interactions
def generate_interactions(customers, num):
    interactions = []
    for _ in range(num):
        interaction_id = _
        customer_id = random.choice(customers)[0]
        interaction_type = random.choice(['Email', 'Phone Call', 'Meeting', 'Chat'])
        interaction_date = fake.date_time_this_decade(before_now=True, after_now=False, tzinfo=None)
        notes = fake.sentence(nb_words=10)
        interactions.append([interaction_id, customer_id, interaction_type, interaction_date, notes])
    return interactions

# Generate random data for Sales
def generate_sales(customers, num):
    sales = []
    for _ in range(num):
        sale_id = _
        customer_id = random.choice(customers)[0]
        product = random.choice(['Product A', 'Product B', 'Product C', 'Product D'])
        amount = round(random.uniform(100, 1000), 2)
        sale_date = fake.date_time_this_decade(before_now=True, after_now=False, tzinfo=None)
        status = random.choice(['Lead', 'Opportunity', 'Closed', 'Pending'])
        sales.append([sale_id, customer_id, product, amount, sale_date, status])
    return sales

# Generate random data for SupportTickets
def generate_support_tickets(customers, num):
    support_tickets = []
    for _ in range(num):
        ticket_id = _
        customer_id = random.choice(customers)[0]
        issue_description = random.choice(['Login issue', 'Payment failure', 'Product not received', 'Account locked'])
        status = random.choice(['Open', 'In Progress', 'Closed'])
        opened_at = fake.date_time_this_decade(before_now=True, after_now=False, tzinfo=None)
        closed_at = opened_at + timedelta(days=random.randint(0, 30)) if status == 'Closed' else None
        support_tickets.append([ticket_id, customer_id, issue_description, status, opened_at, closed_at])
    return support_tickets

# Write data to CSV files
def write_to_csv(filename, data, headers):
    with open(filename, 'w', newline='') as file:
        writer = csv.writer(file)
        writer.writerow(headers)
        writer.writerows(data)

# Generate and save the data
num_records = 1000
customers = generate_customers(num_records)
interactions = generate_interactions(customers, num_records)
sales = generate_sales(customers, num_records)
support_tickets = generate_support_tickets(customers, num_records)

write_to_csv('customers.csv', customers, ['customer_id', 'name', 'email', 'phone', 'address', 'created_at'])
write_to_csv('interactions.csv', interactions, ['interaction_id', 'customer_id', 'interaction_type', 'interaction_date', 'notes'])
write_to_csv('sales.csv', sales, ['sale_id', 'customer_id', 'product', 'amount', 'sale_date', 'status'])
write_to_csv('support_tickets.csv', support_tickets, ['ticket_id', 'customer_id', 'issue_description', 'status', 'opened_at', 'closed_at'])

print("Data generation complete. Files have been saved.")
