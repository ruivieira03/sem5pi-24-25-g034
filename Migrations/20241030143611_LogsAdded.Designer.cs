﻿// <auto-generated />
using System;
using Hospital.Infraestructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace sem5pi_24_25_g202.Migrations
{
    [DbContext(typeof(HospitalDbContext))]
    [Migration("20241030143611_LogsAdded")]
    partial class LogsAdded
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.10")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            MySqlModelBuilderExtensions.AutoIncrementColumns(modelBuilder);

            modelBuilder.Entity("Hospital.Domain.Logs.AccountDeletionLog", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("Timestamp")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("AccountDeletionLogs", (string)null);
                });

            modelBuilder.Entity("Hospital.Domain.Logs.ProfileUpdateLog", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("ChangedFields")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateTime>("Timestamp")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("ProfileUpdateLogs", (string)null);
                });

            modelBuilder.Entity("Hospital.Domain.Patients.Patient", b =>
                {
                    b.Property<Guid>("Id")
                        .HasColumnType("char(36)");

                    b.Property<string>("AllergiesOrMedicalConditions")
                        .HasMaxLength(500)
                        .HasColumnType("varchar(500)");

                    b.Property<string>("AppointmentHistory")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateTime>("DateOfBirth")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("varchar(100)");

                    b.Property<string>("EmergencyContact")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("varchar(100)");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("varchar(50)");

                    b.Property<string>("Gender")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("varchar(50)");

                    b.Property<string>("MedicalRecordNumber")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("varchar(20)");

                    b.Property<string>("PhoneNumber")
                        .IsRequired()
                        .HasMaxLength(15)
                        .HasColumnType("varchar(15)");

                    b.HasKey("Id");

                    b.HasIndex("Email", "PhoneNumber")
                        .IsUnique();

                    b.ToTable("Patients", (string)null);

                    b.HasData(
                        new
                        {
                            Id = new Guid("1ba79918-ba81-4be4-9021-3a21816b4870"),
                            AllergiesOrMedicalConditions = "[\"Penicillin allergy\"]",
                            AppointmentHistory = "[\"Checkup on 2024-01-20\"]",
                            DateOfBirth = new DateTime(1985, 5, 21, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Email = "1220741@isep.ipp.pt",
                            EmergencyContact = "0987654321",
                            FirstName = "Bernardo",
                            Gender = "Male",
                            LastName = "Giao",
                            MedicalRecordNumber = "MRN123456",
                            PhoneNumber = "1234567890"
                        },
                        new
                        {
                            Id = new Guid("59b71702-b88c-4693-9f27-fa2d4c64bdd6"),
                            AllergiesOrMedicalConditions = "[\"Nut allergy\"]",
                            AppointmentHistory = "[\"Vaccination on 2023-05-15\"]",
                            DateOfBirth = new DateTime(1999, 10, 10, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Email = "ruimdvieir@gmail.com",
                            EmergencyContact = "0987654322",
                            FirstName = "Rui",
                            Gender = "Male",
                            LastName = "Vieira",
                            MedicalRecordNumber = "MRN987654",
                            PhoneNumber = "1234567891"
                        });
                });

            modelBuilder.Entity("Hospital.Domain.Users.SystemUser.SystemUser", b =>
                {
                    b.Property<Guid>("Id")
                        .HasColumnType("char(36)");

                    b.Property<string>("DeleteToken")
                        .HasColumnType("longtext");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("IAMId")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<Guid?>("PatientId")
                        .HasColumnType("char(36)");

                    b.Property<string>("PhoneNumber")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("ResetToken")
                        .HasColumnType("longtext");

                    b.Property<int>("Role")
                        .HasColumnType("int");

                    b.Property<DateTime?>("TokenExpiry")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("varchar(50)");

                    b.Property<string>("VerifyToken")
                        .HasColumnType("longtext");

                    b.Property<bool>("isVerified")
                        .HasColumnType("tinyint(1)");

                    b.HasKey("Id");

                    b.HasIndex("PatientId")
                        .IsUnique();

                    b.ToTable("SystemUser", (string)null);

                    b.HasData(
                        new
                        {
                            Id = new Guid("80af1948-14d7-44f1-b46b-151f799a123e"),
                            Email = "ruimdv13@gmail.com",
                            IAMId = "1",
                            Password = "SEM5pi1234@",
                            PhoneNumber = "912028969",
                            Role = 0,
                            Username = "adminUser",
                            isVerified = true
                        },
                        new
                        {
                            Id = new Guid("4260c00c-2650-4c27-aab1-6c267fd4ef68"),
                            Email = "doctor@hospital.com",
                            IAMId = "2",
                            Password = "SEM5pi1234@",
                            PhoneNumber = "1234567891",
                            Role = 1,
                            Username = "doctorUser",
                            isVerified = true
                        },
                        new
                        {
                            Id = new Guid("c7537641-3f3f-4a51-9d4c-7da2f519c0e8"),
                            Email = "nurse@hospital.com",
                            IAMId = "3",
                            Password = "SEM5pi1234@",
                            PhoneNumber = "1234567892",
                            Role = 2,
                            Username = "nurseUser",
                            isVerified = true
                        });
                });

            modelBuilder.Entity("Hospital.Domain.Users.SystemUser.SystemUser", b =>
                {
                    b.HasOne("Hospital.Domain.Patients.Patient", "Patient")
                        .WithOne("SystemUser")
                        .HasForeignKey("Hospital.Domain.Users.SystemUser.SystemUser", "PatientId");

                    b.Navigation("Patient");
                });

            modelBuilder.Entity("Hospital.Domain.Patients.Patient", b =>
                {
                    b.Navigation("SystemUser");
                });
#pragma warning restore 612, 618
        }
    }
}
