﻿using Application.Core;
using AutoMapper;
using Domain.Contracts;
using MediatR;

namespace Application.Doctors
{
    public class List
    {
        public record GetDoctorsQuery : IRequest<Result<IEnumerable<DoctorDto>>>;

        public class GetDoctorsQueryHandler(IDoctorRepository _doctorRepository, IMapper _mapper) : IRequestHandler<GetDoctorsQuery, Result<IEnumerable<DoctorDto>>>
        {
            public async Task<Result<IEnumerable<DoctorDto>>> Handle(GetDoctorsQuery request, CancellationToken cancellationToken)
            {
                var doctors = await _doctorRepository.GetAllAsync();
                if (doctors is null || !doctors.Any()) return Result<IEnumerable<DoctorDto>>.Failure(ErrorType.NotFound, "No doctor records found in the hospital");

                var doctorDtos = _mapper.Map<IEnumerable<DoctorDto>>(doctors);
                if (doctorDtos is null) return Result<IEnumerable<DoctorDto>>.Failure(ErrorType.NotFound, "Problem while mapping between entity/dto!");

                return Result<IEnumerable<DoctorDto>>.Success(doctorDtos);
            }
        }

    }
}
