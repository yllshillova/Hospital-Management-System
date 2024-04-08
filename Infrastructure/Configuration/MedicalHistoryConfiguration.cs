using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configuration
{
    internal class MedicalHistoryEntityConfiguration : IEntityTypeConfiguration<MedicalHistory>
    {
        public void Configure(EntityTypeBuilder<MedicalHistory> builder)
        {
            builder.HasOne(m => m.Patient) 
                  .WithMany() 
                  .HasForeignKey(m => m.PatientId)
                  .OnDelete(DeleteBehavior.SetNull);  //OnDelete(DeleteBehavior.SetNull) do të thotë që kur një pacient fshihet, çelësi i pacientit në tabelën Histori Mjekësore (MedicalHistory)
                                                      //do të ndryshohet në NULL, por të dhënat në vet Historinë Mjekësore (MedicalHistory) nuk do të fshihen.
                                                      //Kjo është një mënyrë për të ruajtur të dhënat mjekësore edhe pasi pacienti është fshirë nga sistemi.
        }
    }
}
